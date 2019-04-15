import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ErrorMessageService } from '../error-message.service';
import { WindowRefService } from '../window-ref.service';

/** 
 * The MediaRecorder type here needs to be declared.
  See https://stackoverflow.com/questions/40051818/how-can-i-use-a-mediarecorder-object-in-an-angular2-application
  for a method of including it fully within Typescript
**/
declare var MediaRecorder: any;

@Component({
  selector: 'app-simple-playback',
  templateUrl: './simple-playback.component.html',
  styleUrls: ['./simple-playback.component.scss']
})
export class SimplePlaybackComponent implements OnInit {

  @ViewChild('audioElement')
  audioElement: ElementRef;


  recording: boolean;
  mediaRecorder: any;
  timeoutMilliseconds: number = 3000;

  constructor(private windowRefService: WindowRefService, private errorMessageService: ErrorMessageService) { }


  ngOnInit() {
  }
  record() {
    this.recording = true;
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const window = this.windowRefService.nativeWindow;
        window.streamReference = stream;

        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();

        let audioElement: HTMLAudioElement = this.audioElement.nativeElement;
        audioElement.controls = true;
        audioElement.autoplay = false;

        const audioChunks = [];
        this.mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });

        this.mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          console.log("GOT AUDIO BLOB", audioUrl);
          const audio = new Audio(audioUrl);
          this.audioElement.nativeElement.src = audioUrl;//Object = stream;
          /** 
      
       console.log("DONE", stream.id,stream.active);
       **/
          //audio.play();

        });

        setTimeout(() => {
          this.stop();
        }, this.timeoutMilliseconds);
      });

  }
  stop() {
    console.log("STOPPING AUDIO")
    this.recording = false;
    try {
      this.mediaRecorder.stop();
    } catch (err) {
      //this suppresses error is throw is timeout occurs after user presses the stop recording button.

    }
    //this removes the pulsing microphone icon on the tab after the recording stops
    //see https://github.com/streamproc/MediaStreamRecorder/issues/76
    const window = this.windowRefService.nativeWindow;
    if (window.streamReference) {
      window.streamReference.getAudioTracks().forEach(function (track) {
        try {
          track.stop();
        } catch (err) { }
      });
    }

    window.streamReference = null;
  }
}
