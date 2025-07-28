/**
 * Created by colinjlacy on 4/25/16.
 */
import { Component } from '@angular/core';

@Component({
    selector: 'app-loading-container',
    template: ` <div class="size-full grid place-content-center">
    <div class="size-24 inline-block relative after:[animation-delay:1s] after:content-[''] after:size-24 after:rounded-full after:absolute after:left-0 after:top-0 after:bg-[radial-gradient(rgb(var(--primary)),rgb(var(--secondary)))] after:animate-loader before:content-[''] before:size-24 before:rounded-full before:absolute before:left-0 before:top-0 before:bg-[radial-gradient(rgb(var(--primary)),rgb(var(--secondary)))] before:animate-loader"></div>
  </div>`,
    standalone: false
})
export class LoadingContainerComponent {
  constructor() {}
}
