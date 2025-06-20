/**
 * Created by colinjlacy on 4/25/16.
 */
import { Component } from '@angular/core';

@Component({
    selector: 'app-loading-container',
    template: ` <div>
    <style type="text/css">
      width: 100%;
      @-webkit-keyframes uilsquare {
        0% {
          background-color: #047ab3;
        }
        1% {
          background-color: #00cde8;
        }
        11% {
          background-color: #00cde8;
        }
        21% {
          background-color: #047ab3;
        }
        100% {
          background-color: #047ab3;
        }
      }
      @-webkit-keyframes uilsquare {
        0% {
          background-color: #047ab3;
        }
        1% {
          background-color: #00cde8;
        }
        11% {
          background-color: #00cde8;
        }
        21% {
          background-color: #047ab3;
        }
        100% {
          background-color: #047ab3;
        }
      }
      @-moz-keyframes uilsquare {
        0% {
          background-color: #047ab3;
        }
        1% {
          background-color: #00cde8;
        }
        11% {
          background-color: #00cde8;
        }
        21% {
          background-color: #047ab3;
        }
        100% {
          background-color: #047ab3;
        }
      }
      @-ms-keyframes uilsquare {
        0% {
          background-color: #047ab3;
        }
        1% {
          background-color: #00cde8;
        }
        11% {
          background-color: #00cde8;
        }
        21% {
          background-color: #047ab3;
        }
        100% {
          background-color: #047ab3;
        }
      }
      @-moz-keyframes uilsquare {
        0% {
          background-color: #047ab3;
        }
        1% {
          background-color: #00cde8;
        }
        11% {
          background-color: #00cde8;
        }
        21% {
          background-color: #047ab3;
        }
        100% {
          background-color: #047ab3;
        }
      }
      @-webkit-keyframes uilsquare {
        0% {
          background-color: #047ab3;
        }
        1% {
          background-color: #00cde8;
        }
        11% {
          background-color: #00cde8;
        }
        21% {
          background-color: #047ab3;
        }
        100% {
          background-color: #047ab3;
        }
      }
      @-o-keyframes uilsquare {
        0% {
          background-color: #047ab3;
        }
        1% {
          background-color: #00cde8;
        }
        11% {
          background-color: #00cde8;
        }
        21% {
          background-color: #047ab3;
        }
        100% {
          background-color: #047ab3;
        }
      }
      @keyframes uilsquare {
        0% {
          background-color: #047ab3;
        }
        1% {
          background-color: #00cde8;
        }
        11% {
          background-color: #00cde8;
        }
        21% {
          background-color: #047ab3;
        }
        100% {
          background-color: #047ab3;
        }
      }
      .uil-squares-css {
        background: none;
        position: relative;
        width: 200px;
        height: 200px;
        left: 50%;
        transform: translateX(-50%);
      }
      div:has(.uil-squares-css){
        transform: scale(.25);
      }
      .uil-squares-css div {
        position: absolute;
        z-index: 1;
        width: 40px;
        height: 40px;
        background-color: #047ab3;
      }
      .uil-squares-css div > div {
        position: absolute;
        top: 0;
        left: 0;
        -ms-animation: uilsquare 1s linear infinite;
        -moz-animation: uilsquare 1s linear infinite;
        -webkit-animation: uilsquare 1s linear infinite;
        -o-animation: uilsquare 1s linear infinite;
        animation: uilsquare 1s linear infinite;
        width: 40px;
        height: 40px;
      }
      .uil-squares-css > div:nth-of-type(1) {
        top: 30px;
        left: 30px;
      }
      .uil-squares-css > div:nth-of-type(1) > div {
        -ms-animation-delay: 0s;
        -moz-animation-delay: 0s;
        -webkit-animation-delay: 0s;
        -o-animation-delay: 0s;
        animation-delay: 0s;
      }
      .uil-squares-css > div:nth-of-type(2) {
        top: 30px;
        left: 80px;
      }
      .uil-squares-css > div:nth-of-type(2) > div {
        -ms-animation-delay: 0.125s;
        -moz-animation-delay: 0.125s;
        -webkit-animation-delay: 0.125s;
        -o-animation-delay: 0.125s;
        animation-delay: 0.125s;
      }
      .uil-squares-css > div:nth-of-type(3) {
        top: 30px;
        left: 130px;
      }
      .uil-squares-css > div:nth-of-type(3) > div {
        -ms-animation-delay: 0.25s;
        -moz-animation-delay: 0.25s;
        -webkit-animation-delay: 0.25s;
        -o-animation-delay: 0.25s;
        animation-delay: 0.25s;
      }
      .uil-squares-css > div:nth-of-type(4) {
        top: 80px;
        left: 130px;
      }
      .uil-squares-css > div:nth-of-type(4) > div {
        -ms-animation-delay: 0.375s;
        -moz-animation-delay: 0.375s;
        -webkit-animation-delay: 0.375s;
        -o-animation-delay: 0.375s;
        animation-delay: 0.375s;
      }
      .uil-squares-css > div:nth-of-type(5) {
        top: 130px;
        left: 130px;
      }
      .uil-squares-css > div:nth-of-type(5) > div {
        -ms-animation-delay: 0.5s;
        -moz-animation-delay: 0.5s;
        -webkit-animation-delay: 0.5s;
        -o-animation-delay: 0.5s;
        animation-delay: 0.5s;
      }
      .uil-squares-css > div:nth-of-type(6) {
        top: 130px;
        left: 80px;
      }
      .uil-squares-css > div:nth-of-type(6) > div {
        -ms-animation-delay: 0.625s;
        -moz-animation-delay: 0.625s;
        -webkit-animation-delay: 0.625s;
        -o-animation-delay: 0.625s;
        animation-delay: 0.625s;
      }
      .uil-squares-css > div:nth-of-type(7) {
        top: 130px;
        left: 30px;
      }
      .uil-squares-css > div:nth-of-type(7) > div {
        -ms-animation-delay: 0.75s;
        -moz-animation-delay: 0.75s;
        -webkit-animation-delay: 0.75s;
        -o-animation-delay: 0.75s;
        animation-delay: 0.75s;
      }
      .uil-squares-css > div:nth-of-type(8) {
        top: 80px;
        left: 30px;
      }
      .uil-squares-css > div:nth-of-type(8) > div {
        -ms-animation-delay: 0.875s;
        -moz-animation-delay: 0.875s;
        -webkit-animation-delay: 0.875s;
        -o-animation-delay: 0.875s;
        animation-delay: 0.875s;
      }
    </style>
    <div class="uil-squares-css" >
      <div><div></div></div>
      <div><div></div></div>
      <div><div></div></div>
      <div><div></div></div>
      <div><div></div></div>
      <div><div></div></div>
      <div>
        <div></div>
      </div>
      <div><div></div></div>
    </div>
  </div>`,
    standalone: false
})
export class LoadingContainerComponent {
  constructor() {}
}
