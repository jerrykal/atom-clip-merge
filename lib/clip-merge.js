'use babel';
'use strict';

import {CompositeDisposable} from 'atom';

class ClipMerge {
  activate() {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'clip-merge:copy': () => this.copy(),
      'clip-merge:cut': () => this.cut(),
    }));
  }

  deactivate() {
    this.subscriptions.dispose();
  }

  copy() {
    console.log('Copy!!');
  }
  cut() {
    console.log('Cut!!');
  }
}

export default new ClipMerge();
