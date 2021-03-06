import React, { useMemo, useState } from 'react';

import { ApiResponse, Word } from '@shared/interfaces';
import { Modal, Button, Input, Translate } from '@shared/ui';
import { wordsApi } from '@shared/api';
import { useAbortController, useTranslate } from '@shared/hooks';
import { formatDate } from '@shared/utils';
import './word-edit.less';

interface WordDelete {
  word: Word;
  onClose: () => void;
  onEdited: (newWord: Word) => void;
}

export function WordEdit({ word, onClose, onEdited }: WordDelete) {
  const translate = useTranslate();
  const updateAbort = useAbortController();
  const [data, setData] = useState<Word>(() => ({ ...word }));
  const [loading, setLoading] = useState(false);

  const valid = !!data.text?.trim();

  const [created, updated] = useMemo(() => {
    return [formatDate(word.createdAt), formatDate(word.updatedAt)];
  }, [word]);

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();

    if (!hasChanges()) {
      onClose();
      return;
    }

    if (!valid) {
      return;
    }

    setLoading(true);

    const req = {
      id: word._id,
      text: data.text,
      translation: data.translation
    };

    wordsApi.updateWord(req, updateAbort.signal())
      .then((result: Word) => {
        onClose();
        onEdited(result);
      })
      .catch((res: ApiResponse) => {
        if (res.status === 400) {
          Modal.alert({ text: translate('wordEdit.existErr', data.text) });
        }
        setLoading(false);
      });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const target = event.target
    setData(values => {
      return { ...values, [target.name]: target.value };
    });
  }

  function hasChanges(): boolean {
    return (word.text !== data.text || word.translation !== data.translation);
  }

  return (
    <Modal
      className="word-edit"
      header={<Translate value="wordEdit.title" />}
      onClose={onClose}
    >
      <form autoCapitalize="off" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-4">
            <Translate value="wordEdit.text" />
          </div>
          <div className="col-8">
            <Input
              name="text"
              placeholder={translate('wordEdit.textHolder')}
              value={data.text}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            {translate('wordEdit.translation')}
          </div>
          <div className="col-8">
            <Input
              name="translation"
              placeholder={translate('wordEdit.translationHolder')}
              maxLength={100}
              value={data.translation}
              onChange={handleChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <Translate value="wordEdit.created" />
          </div>
          <div className="col-8">
            <Input name="created" defaultValue={created} disabled />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <Translate value="wordEdit.updated" />
          </div>
          <div className="col-8">
            <Input name="updated" defaultValue={updated} disabled />
          </div>
        </div>
        <div className="edit-button">
          <Button text={<Translate value="wordEdit.save" />} loading={loading} disabled={!valid}/>
        </div>
      </form>
    </Modal>
  );
}