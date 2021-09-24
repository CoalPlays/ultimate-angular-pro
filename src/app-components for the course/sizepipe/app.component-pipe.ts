// import { Component, OnInit } from '@angular/core';
//
// import { AuthFormComponent } from './auth-form/auth-form.component';
//
// import { User } from './auth-form/auth-form.interface';
// import { FilesizePipe } from './filesize.pipe';
//
// interface File {
//   name: string;
//   size: any;
//   type: string;
// }
//
// @Component({
//   selector: 'app-root',
//   template: `
//     <div>
//       <div *ngFor="let file of mapped">
//         <p>{{ file.name }}</p>
//         <p>{{ file.size }}</p>
//       </div>
//     </div>
//   `,
//   providers: [FilesizePipe],
// })
// export class AppComponent implements OnInit {
//   files: File[] | undefined;
//   mapped: File[] | undefined;
//   constructor(private fileSizepipe: FilesizePipe) {}
//
//   ngOnInit() {
//     this.files = [
//       {
//         name: 'klaus',
//         size: 1000000,
//         type: 'svg',
//       },
//       {
//         name: 'harald',
//         size: 1000000,
//         type: 'svg',
//       },
//       {
//         name: 'hans',
//         size: 78747,
//         type: 'svg',
//       },
//     ];
//     this.mapped = this.files.map((file) => {
//       return {
//         name: file.name,
//         type: file.type,
//         size: this.fileSizepipe.transform(file.size, 'mb'),
//       };
//     });
//   }
// }
