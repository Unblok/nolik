import { action, observable } from 'mobx';
import Router from 'next/router';
import { verifyPublicKey } from '@waves/ts-lib-crypto';

class ChatStore {
  stores = null;
  constructor(stores) {
    this.stores = stores;
    this.toggleCompose = this.toggleCompose.bind(this);
    this.dropCompose = this.dropCompose.bind(this);
    this.writetoNolik = this.writetoNolik.bind(this);
  }

  @observable subject = '';
  @observable message = '';
  @observable defaultSubjectPlaceholder = '';
  @observable defaultMessagePlaceholder = 'Write your message';
  @observable subjectPlaceholder = this.defaultSubjectPlaceholder;
  @observable messagePlaceholder = this.defaultMessagePlaceholder;
  @observable toRecipients = [];
  @observable ccRecipients = [];
  @observable composeMode = false;
  @observable focusMode = false;

  @observable inputTo = '';
  @observable inputCc = '';

  @action
  toggleCompose() {
    this.composeMode = !this.composeMode;
    if (this.composeMode === false) {
      this.dropCompose();
    }
  }

  @action
  toggleFocus() {
    this.focusMode = !this.focusMode;
  }

  @action
  compose(toRecipients) {
    this.toggleCompose();
    this.toRecipients = toRecipients;
  }

  @action
  dropCompose() {
    this.clearChat();
    Router.push('/app');
  }

  @action
  clearChat() {
    this.toRecipients = [];
    this.ccRecipients = [];
    this.subject = '';
    this.message = '';
    this.subjectPlaceholder = this.defaultSubjectPlaceholder;
    this.messagePlaceholder = this.defaultMessagePlaceholder;
  }

  writetoNolik() {
    const { app } = this.stores;
    const publicKey = 'cEdRrkTRMkd61UdQHvs1c2pwLfuCXVTA4GaABmiEqrP';
    this.toRecipients = [publicKey];
    this.composeMode = true;
    app.toggleDrawer();
    Router.push('/app', `/pk/${publicKey}`);
  }

  @action
  addTag(toArray, tagText) {
    const { notifiers } = this.stores;
    if (tagText.trim() === '') {
      return;
    }

    if (
      this.toRecipients.indexOf(tagText) > -1 ||
      this.ccRecipients.indexOf(tagText) > -1
    ) {
      notifiers.info('Recipient is already in the list');
      return;
    }

    let isValidPublicKey = false;
    try {
      isValidPublicKey = verifyPublicKey(tagText);
    } catch (e) {
      notifiers.error(e.message ? e.message : e);
    }

    if (!isValidPublicKey) {
      notifiers.info('Public Key is not valid');
      return;
    }

    if (toArray === 'toRecipients') {
      this.toRecipients = this.toRecipients.concat([tagText]);
      this.inputTo = '';
    }

    if (toArray === 'ccRecipients') {
      this.ccRecipients = this.ccRecipients.concat([tagText]);
      this.inputCc = '';
    }
  }

  @action
  removeTag(fromArray, index) {
    if (fromArray === 'toRecipients') {
      const array = this.toRecipients;
      array.splice(index, 1);
      this.toRecipients = array;
    }

    if (fromArray === 'ccRecipients') {
      const array = this.ccRecipients;
      array.splice(index, 1);
      this.ccRecipients = array;
    }
  }
}

export default ChatStore;
