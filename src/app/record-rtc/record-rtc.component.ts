import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorMessageService } from '../error-message.service';
import { WindowRefService } from '../window-ref.service';
import { environment } from 'src/environments/environment';

import * as Hark from 'hark';
import * as RecordRTC from 'recordrtc';


const AUDIO_SAMPLE_RATE_HERTZ = 44100;
const AUDIO_SAMPLE_ENCODING = "LINEAR16";
const AUDIO_SAMPLE_MEME_TYPE = "audio/wav";
const AUDIO_FILE_EXTENSIONS: any = {
  'audio/wav': 'wav'
}

const BACKEND_URL: string = environment.backendUrl;

@Component({
  selector: 'app-record-rtc',
  templateUrl: './record-rtc.component.html',
  styleUrls: ['./record-rtc.component.scss']
})
export class RecordRtcComponent implements OnInit {

  @ViewChild('audioElement')
  audioElement: ElementRef;

  path: string;
  recording: boolean;
  mediaRecorder: any;

  audioStream: MediaStream;
  recordRTC: RecordRTC;

  constructor(
    private windowRefService: WindowRefService,
    private errorMessageService: ErrorMessageService,
    private httpClient: HttpClient
  ) {

  }

  ngOnInit() { }

  record() {
    this.path = null;
    this.audioElement.nativeElement.src = null
    const window = this.windowRefService.nativeWindow;
    const navigator = window.navigator;
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(this.userMediaSuccess.bind(this), this.userMediaError.bind(this));
  }
  stop() {
    this.stoppedSpeaking();
  }
  userMediaSuccess(stream: MediaStream) {
    this.errorMessageService.send(null);
    this.recording = true;
    this.audioStream = stream;

    const speechEvents = Hark(stream, {});
    speechEvents.on('speaking', this.speaking.bind(this));
    speechEvents.on('stopped_speaking', this.stoppedSpeaking.bind(this));

    this.recordRTC = RecordRTC(stream,
      {
        type: 'audio',
        numberOfAudioChannels: 1, //very important line!! Cannot send audio wav to Google Speech
        recorderType: RecordRTC.StereoAudioRecorder,
        sampleRate: AUDIO_SAMPLE_RATE_HERTZ
      });

    this.recordRTC.startRecording();

  }
  userMediaError(error) {
    this.recording = false;
    console.log("ERROR", error);
  }
  speaking() {
    console.log('speaking');
  }
  stoppedSpeaking() {
    console.log('stopped_speaking');
    if (this.recording) {
      this.recordRTC.stopRecording(this.stoppedRecording.bind(this));
    }
  }

  stoppedRecording(audioVideoWebMUR) {
    this.recording = false;
    const blob = this.recordRTC.getBlob();
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth();
    const date = now.getUTCDay();
    const random = (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '');

    const filename = 'RecordRTC-' + year + (month + 1) + date + '-' + random + '.' + AUDIO_FILE_EXTENSIONS[AUDIO_SAMPLE_MEME_TYPE];
    this.uploadSample(blob, {
      filename: filename,
      encoding: AUDIO_SAMPLE_ENCODING,
      memeType: AUDIO_SAMPLE_MEME_TYPE,
      sampleRateHertz: AUDIO_SAMPLE_RATE_HERTZ
    })
    this.recordRTC.getDataURL(this.stopTracks.bind(this))
  }
  stopTracks(dataURL) {
    this.audioStream.getTracks().map(track => {
      track.stop();
      console.log("STOPPED");
    })
  }

  uploadSample(blob, options) {
    const file = new File([blob], options.filename, { type: options.memeType });
    const formData = new FormData();
    formData.append('file', file);
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });

    this.httpClient.post(BACKEND_URL + "/upload?sampleRateHertz=" + options.sampleRateHertz + "&encoding=" + options.encoding,
      formData,
      { headers: headers })
      .toPromise()
      .then((res: any) => {
        console.log(res);
        //this.errorMessageService.send(null);
        this.path = res.path;
        const audioElement: HTMLAudioElement = this.audioElement.nativeElement;
        audioElement.controls = true;
        audioElement.autoplay = false;
        audioElement.src = BACKEND_URL + '/' + this.path;

      },
        (err: any) => {
          console.log(err);
          this.errorMessageService.send(err);
        });

  }

}
