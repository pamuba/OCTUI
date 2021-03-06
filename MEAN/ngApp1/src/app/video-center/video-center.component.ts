import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css']
})
export class VideoCenterComponent implements OnInit {

  selectedVideo:Video;
  public hidenewVideo:boolean = true;

  videos: Video[] = []
  constructor(private _videoService:VideoService) { }

  ngOnInit(): void {
    this._videoService.getVideos()
        .subscribe(resVideoData => {
          for(const d of (resVideoData as any)){
            this.videos.push(d)
          }
        })
  }

  onSelectVideo(video:Video){
    this.selectedVideo = video;
    this.hidenewVideo = true;
    console.log(this.selectedVideo);
  }
  onSubmitAddVideo(video:Video){
    this._videoService.addVideo(video)
        .subscribe(resNewVideo => {
          this.videos.push(resNewVideo)
          this.hidenewVideo = true;
          this.selectedVideo = resNewVideo
        })
  }

  newVideo(){
    this.hidenewVideo = false;
  }

  onUpdateVideoEvent(video:Video){
    this._videoService.updateVideo(video)
        .subscribe(resUpdatedVideo => video = resUpdatedVideo)

    this.selectedVideo = null;
  }
  //todo
  onDeleteVideoEvent(video:Video){
      //1. delete from database
      //2. delete from the videos array

      let videoArray = this.videos;

      this._videoService.deleteVideo(video)
          .subscribe(resDeletedVideo => {
            for(let i=0; i<videoArray.length; i++){
              if(videoArray[i]._id === video._id){
                videoArray.splice(i,1);
              }
            }
          });
          this.selectedVideo = null;
  }
}
