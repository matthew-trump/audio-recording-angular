import { Component, ViewChild, ElementRef } from '@angular/core';
import { WindowRefService } from './window-ref.service';
import * as RecordRTC from 'recordrtc';
import * as Hark from 'hark';
import { ErrorMessageService } from './error-message.service';
/**
declare var MediaRecorder: any;

const AUDIO_SAMPLE_RATE_HERTZ = 44100;
const AUDIO_SAMPLE_ENCODING = "LINEAR16";
const AUDIO_SAMPLE_MEME_TYPE = "audio/wav";
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sound Recording Demo Angular';
  /** 
  recording: boolean;

  @ViewChild('audioElement')
  audioElement: ElementRef;

  public audio: HTMLAudioElement;
  audioStream: MediaStream;
  recordRTC: RecordRTC;

  extensions: any = {
    'audio/wav': 'wav'
  }
  */
  //mediaRecorder: any;

  constructor(private errorMessageService: ErrorMessageService) {

  }
  /** 
  record() {
    this.recording = true;
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const window = this.windowRefService.nativeWindow;
        window.streamReference = stream;

        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();

        const audioChunks = [];
        this.mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });

        this.mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          console.log("GOT AUDIO BLOB", audioUrl);
          const audio = new Audio(audioUrl);
          audio.play();

        });

        setTimeout(() => {
          this.stop();
        }, 3000);
      });

  }
  stop() {
    console.log("STOPPING AUDIO")
    this.recording = false;
    this.mediaRecorder.stop();

    //this removes the pulsing microphone icon on the tab after the recording stops
    //see https://github.com/streamproc/MediaStreamRecorder/issues/76
    const window = this.windowRefService.nativeWindow;
    window.streamReference.getAudioTracks().forEach(function (track) {
      track.stop();
    });
    window.streamReference = null;
  }



  getUserMedia() {
    //this.recognizedSpeech = null;
    const window = this.windowRefService.nativeWindow;
    const navigator = window.navigator;

    let audioElement: HTMLAudioElement = this.audioElement.nativeElement;
    audioElement.controls = true;
    audioElement.autoplay = false;

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }
  errorCallback(error) {
    this.recording = false;
    console.log("ERROR", error);
  }
  successCallback(stream: MediaStream) {
    this.recording = true;
    this.audioStream = stream;

    this.audioElement.nativeElement.srcObject = stream;
    console.log("DONE", stream.id, stream.active);

    /** 
    const c = this;
    var options = {};
   
    var speechEvents = Hark(stream, options);
    speechEvents.on('speaking', function() {
     console.log('speaking');
    });
     
    speechEvents.on('stopped_speaking', function() {
     console.log('stopped_speaking');
     c.stopStream();
    });
     */
  //this.errorMessageService.send(null);
  /**
 this.recordRTC = RecordRTC(stream,
   { type: 'audio', 
     numberOfAudioChannels: 1, //very important line if using Google Speech. Cannot send audio wav to Google Speech
     recorderType: RecordRTC.StereoAudioRecorder,
     sampleRate:   AUDIO_SAMPLE_RATE_HERTZ });

     this.recordRTC.startRecording();
*/

  //}
  /**
  stopStream() {
    /** 
    const c = this;
    this.recordRTC.stopRecording(function (audioVideoWebMURL) {
       c.recording   = false;
       const blob = c.recordRTC.getBlob();
 
       const now      = new Date();
       const year     = now.getUTCFullYear();
       const month    = now.getUTCMonth();
       const date     = now.getUTCDay();
       const random   = (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '');
   
       const filename = 'RecordRTC-' + year + (month+1) + date + '-' + random  + '.' + c.extensions[AUDIO_SAMPLE_MEME_TYPE];
   
       console.log("FILENAME",filename);
    })
    */
  //}

}
