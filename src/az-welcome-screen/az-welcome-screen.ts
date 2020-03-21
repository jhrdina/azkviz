import { PolymerElement, html } from "@polymer/polymer";
import { customElement, property } from "@polymer/decorators";

interface AzFileChangeDetail {
  file: File;
}

@customElement('az-welcome-screen')
class AzWelcomeScreen extends PolymerElement {

  $: {
    file: HTMLInputElement;
  };

  private _onHelpButtonTap() {
    this.fire('open-help');
  }

  private _onOpenButtonTap() {
    this.$.file.click();
  }

  private _onFileChange(event: { target: HTMLInputElement }) {
    if (!event.target.files[0])
      return;

    this.fire('file-change', <AzFileChangeDetail> {
      file: event.target.files[0]
    });

    this._resetFileInput();
  }

  private _resetFileInput() {
    // Inspired by https://github.com/rnicholus/file-input

    // create a form with a hidden reset button
    var tempForm = document.createElement("form"),
        fileInput = this.$.file;

    // temporarily move the `<input type="file">` into the form & add form to DOM
    fileInput.parentNode.insertBefore(tempForm, fileInput);
    tempForm.appendChild(fileInput);

    // reset the form
    tempForm.reset();

    // move the `<input type="file">` back to its original spot & remove form
    tempForm.parentNode.appendChild(fileInput);
    tempForm.parentNode.removeChild(tempForm);
  }
}

