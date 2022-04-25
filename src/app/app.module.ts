import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { environment } from '../environments/environment.prod';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { UserGuard } from "./guards/user.guard";
import { JwtInterceptor } from "./interceptors/jwt-interceptor";
import { Config } from "./providers/config";
import { IonicStorageModule } from "@ionic/storage";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { Contacts } from "@ionic-native/contacts/ngx";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";
import { Clipboard } from "@ionic-native/clipboard/ngx";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';

import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@ionic-native/file-transfer/ngx";
import { TouchID } from "@ionic-native/touch-id/ngx";
import { SuperTabsModule } from "@ionic-super-tabs/angular";

import { DatePipe, CurrencyPipe } from "@angular/common";
import { PusherServiceProvider } from "./providers/pusher-service.service";
import { Crop } from "@ionic-native/crop/ngx";
import { Device } from "@ionic-native/device/ngx";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";

import { NgIdleKeepaliveModule } from "@ng-idle/keepalive";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
const config: SocketIoConfig = {
  url: "http://euzZittaging.com.ng:3001",
  options: {},
};

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogoutPageModule } from './pages/logout/logout.module';
import { ComponentsModule } from './components/components.module';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot({ mode: 'ios' }), 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule, // imports firebase/firestore
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireFunctionsModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    ComponentsModule,
    FontAwesomeModule,
    CountdownModule,
    SuperTabsModule.forRoot(),
    SuperTabsModule.forRoot(),
    IonicStorageModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    AppRoutingModule,
    LogoutPageModule],
  providers: [ Clipboard,
    Camera,
    // tslint:disable-next-line: deprecation
    FileTransfer,
    Screenshot,
    Crop,
    TouchID,
    PDFGenerator,
    Device,
    AndroidPermissions,
    StatusBar,
    SplashScreen,
    UserGuard,
    LocalNotifications,

    // tslint:disable-next-line: deprecation
    Contacts,

    PusherServiceProvider,
    InAppBrowser,
    DatePipe,
    CurrencyPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    Config,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
