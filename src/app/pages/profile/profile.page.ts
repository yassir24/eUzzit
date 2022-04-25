import {
  Component,
  OnInit,
  ViewChild,
  AfterContentChecked,
  AfterViewChecked,
} from "@angular/core";
import {
  PopoverController,
  AlertController,
  LoadingController,
  ActionSheetController,
  // Events,
  NavController,
  Platform,
  ToastController,
} from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { Storage } from "@ionic/storage";
// import { Share } from '@capacitor/share';
import { Clipboard } from '@ionic-native/clipboard/ngx';

import { Share } from '@capacitor/share';

// import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import {
  Camera,
  CameraOptions,
  PictureSourceType,
} from "@ionic-native/camera/ngx";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@ionic-native/file-transfer/ngx";
import { AuthenticationService } from "src/app/services/authentication.service";
import { WalletService } from "src/app/services/wallet.service";
import { Crop } from "@ionic-native/crop/ngx";
import { Config } from "../../providers/config";
import { CheckpinService } from "src/app/services/checkpin.service";
import { EventsService } from "src/app/services/events.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userinfo: any;
  userprofile: any;
  phone: any;
  imageData: any;
  image: any;

  userdata: any;
  profile;
  usertype: any;
  fileUrl: any;
  mymerchant: any;
  isMerchant = false;
  profileImage: any;
  ProfilePage;
  activation;
  upgrade2;
  lifeline;

  passcode: any;
  resetPinConfirmationAlert = `Please we recommend that you only do this when your Pin has been compromised or when you have forgotten your Pin.<br><br>
  On resetting your Pin, the new Pin would be sent via your Email address.`;

  changePass: boolean = false;
  changePasswordForm: any;
  submitted: boolean = false;

  slideProfileOpts = {
    effect: "flip",
    autoHeight: true,
    speed: 1000,
    spaceBetween: 15,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    slidesPerView: 4,
  };

  // varibale for activated and upgraded account
  activated: any;
  status: number;
  upgrade: number;

  bankNo = null;
  bankName = null;
  isloaded = false;

  constructor(
    private route: ActivatedRoute,
    public popoverController: PopoverController,
    public alertController: AlertController,
    private router: Router,
    public storage: Storage,
    private clipboard: Clipboard,
    public nav: NavController,
    private camera: Camera,
    private crop: Crop,
    private user: UserService,
    private pinService: CheckpinService,
    private platform: Platform,
    private authService: AuthenticationService,
    private toastController: ToastController,
    // tslint:disable-next-line: deprecation
    private transfer: FileTransfer,
    public loadingController: LoadingController,
    public auth: AuthenticationService,
    public actionSheetController: ActionSheetController,
    public events: EventsService,
    public config: Config,
    private walletService: WalletService
  ) {
    route.params.subscribe((val) => {
      this.authService.getuserdetails().subscribe(
        (data) => {
          console.log(data);
          this.activation = data.data.activations;
          this.upgrade2 = data.data.upgrades;
          this.lifeline = data.data.lifelines;
        },
        (error) => {
          console.log(error);
        }
      );

      this.storage.get("mymerchant").then((merchant) => {
        if (merchant) {
          // console.log(merchant);
          this.isMerchant = true;
          this.mymerchant = merchant;
        }
      });

      this.callUserData();
      console.log(this.userinfo);
    });
    this.status = 0;
    this.upgrade = 0;

    this.events.subscribe("login", (data) => {
      this.callUserData();
    });

    this.events.subscribe("usertype", (data) => {
      this.usertype = data;
    });
  }

  ionViewWillEnter() {
    try {
      this.user.accountNo().subscribe((data) => {
        this.bankName = data.data.bank_name;
        this.bankNo = data.data.account_number;
        this.isloaded = true;
        console.log('this is the account data', data )
      });
    } catch (error) { // if error
      console.log('something went wront tring to get account details', error); // return error
    }
  }

  

  async ngOnInit() {
    console.log('this is the user account data', this.userdata)
    await this.authService.getuserdetails().subscribe(
      (data) => {
        this.activation = data.data.activation;
        this.upgrade2 = data.data.upgrades;
        this.lifeline = data.data.lifelines;
      },
      (error) => {
        console.log(error);
      }
    );

    this.storage.get("mymerchant").then((merchant) => {
      if (merchant) {
        // console.log(merchant);
        this.isMerchant = true;
        this.mymerchant = merchant;
      }
    });

    await this.callUserData();
    console.log(this.userinfo);

  
  }

  goLifeline() {
    this.router.navigateByUrl('/lifeline')
  }

  goUsersettings() {
    this.router.navigateByUrl('/user-settings')
  }

  async shareRef() {
    await Share.share({
      title: 'Hi Register on eUzzit!',
      text: `Hello, let's transact with Euzzit App and earn Zit reward to enjoy Zero-risk Investment, Access Loan, Free Life Insurance and Free Pension Plan. Register with this link https://euzzit.com/register?ref=${this.phone} or use my invite code ${this.phone} to register on Euzzit App`,
      url: `https://euzzit.com/register?ref=${this.phone}`,
      dialogTitle: 'Share eUzzit',
    })
  }

  async callUserData() {
    this.userinfo = await this.storage.get("user");
    // this.userprofile = this.storage.get('profile');

    // console.log(this.userprofile);
    console.log(this.userinfo);

    this.phone = this.userinfo.phone;
    this.usertype = this.userinfo.type;
    this.activated = this.userinfo.account_status == "ACTIVE" ? true : false;
    console.log(
      "this is is where i log out of this account is activated or not and so we need to do more for the economy",
      this.activated,
      this.userinfo
    );
    // this.activated = this.userinfo.activated;
  }

  toPresentPopover(params) {
    this.presentPopover(params);
  }

  logout() {
    this.presentAlertConfirm();
  }

  async presentPopover(ev: any) {}

  manageMerchant() {
    this.nav.navigateForward("/container");
  }


  copyAccount() {
    this.clipboard.copy(`${this.userinfo.first_name} ${this.userinfo.last_name} ${this.bankName} Bank. Account Number:${this.bankNo}`).then(()=>{
      this.messageToast('Copied', 2000, 'bottom', 'primary')
   })
  }

  async messageToast(message: string, duration: number, positions, color: string) {
    const toast = await this.toastController.create({
      message,
      duration,
      animated: true,
      color,
      position: positions,
      translucent: false,
      buttons: [
        // {
        //   side: 'start',
        //   icon: 'star',
        //   text: 'Favorite',
        //   handler: () => {
        //     console.log('Favorite clicked');
        //   }
        // },
        
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  // async shareRef() {
  //   await Share.share({
  //     title: 'Hi Register on eUzzit!',
  //     text: `Hello, let's transact with Euzzit App and earn Zit reward to enjoy Zero-risk Investment, Access Loan, Free Life Insurance and Free Pension Plan. Register with this link https://euzzit.com/register?ref=${this.phone} or use my invite code ${this.phone} to register on Euzzit App`,
  //     url: `https://euzzit.com/register?ref=${this.phone}`,
  //     dialogTitle: 'Share eUzzit',
  //   })
  // }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: "Sign Out?",
      message: "Are you sure you want to logout your eUzzit Account?",
      buttons: [
        {
          text: "Nope",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Yes",
          handler: () => {
            this.events.publish("logout", {action: "Logout!"});
            this.runlogout();
            this.router.navigateByUrl("/login");
            console.log("Confirm Okay");
          },
        },
      ],
    });

    await alert.present();
  }

  async runlogout() {
    return await this.auth.logout();
  }

  async presentUploadOpts() {
    // const actionSheet = await this.actionSheetController.create({
    //   header: "Upload Photo",
    //   buttons: [
    //     {
    //       text: "Camera",
    //       icon: "camera",
    //       handler: () => {
    //         this.takePicture(this.camera.PictureSourceType.CAMERA);
    //         // this.openCam();
    //       },
    //     },
    //     {
    //       text: "Gallery",
    //       icon: "albums",
    //       handler: () => {
    //         this.openGallery();
    //       },
    //     },
    //     {
    //       text: "Cancel",
    //       icon: "close",
    //       role: "cancel",
    //       handler: () => {
    //         console.log("Cancel clicked");
    //       },
    //     },
    //   ],
    // });
    // await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 50,
      sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then((imagePath) => {
      if (
        this.platform.is("android") &&
        sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
      ) {
        this.crop.crop(imagePath, { quality: 100 }).then((image) => {
          this.imageData = `data:image/jpeg;base64,${image}`;
          this.uploadPhoto();
        });
      } else {
        this.crop.crop(imagePath, { quality: 100 }).then((image) => {
          this.imageData = `data:image/jpeg;base64,${image}`;
          this.uploadPhoto();
        });
      }
    });
  }

  // openCam() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.platform.is('android') ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.NATIVE_URI,
  //     encodingType: this.camera.EncodingType.PNG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     sourceType: this.camera.PictureSourceType.CAMERA
  //   };

  //   this.camera.getPicture(options).then((imageData) => {
  //   // imageData is either a base64 encoded string or a file URI
  //   // If it's base64 (DATA_URL):
  //   // alert(imageData)
  //   //  this.imageData = imageData
  //   //  this.uploadPhoto();

  //   this.crop.crop(imageData, { quality: 100 })
  //   .then(
  //     newImage => {

  //       this.imageData = newImage;
  //       this.uploadPhoto();
  //     },
  //     error => console.error('Error cropping image', error)
  //   );

  //   }, (err) => {
  //   // Handle error
  //   alert('error ' + JSON.stringify(err));
  //   });
  // }

  openGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.platform.is("android")
        ? this.camera.DestinationType.FILE_URI
        : this.camera.DestinationType.NATIVE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        this.crop.crop(imageData, { quality: 100 }).then(
          (newImage) => {
            this.imageData = newImage;
            this.uploadPhoto();
          },
          (error) => console.error("Error cropping image", error)
        );
      },
      (err) => {
        // Handle error
        alert("error " + JSON.stringify(err));
      }
    );
  }

  async uploadPhoto() {
    const loading = await this.loadingController.create({
      message: "Uploading...",
    });

    await loading.present();

    const fileTransfer: FileTransferObject = this.transfer.create();

    const token: any = await this.storage.get("token");

    const options: FileUploadOptions = {
      fileKey: "photo",
      fileName: this.imageData.substr(this.imageData.lastIndexOf("/") + 1),
      chunkedMode: false,
      httpMethod: "POST",
      headers: {
        Accept: `application/json`,
        "Content-Type": `application/json`,
        Authorization: `Bearer ${token}`,
      },
    };

    fileTransfer
      .upload(
        this.imageData,
        encodeURI(`${this.config.api_url}/user/upload-profile-photo`),
        options
      )
      .then(
        (data) => {
          // this.fileUrl = this.config.storage_url + JSON.parse(data.response).photo;

          this.storage.remove("profile");
          this.storage.set("profile", data.response);
          this.userprofile = this.storage.get("profile");
          // this.storage.set('merchant_photo', this.fileUrl);

          // console.log(this.fileUrl);
          loading.dismiss();
        },
        (error) => {
          alert("error" + JSON.stringify(error));
          loading.dismiss();
        }
      );
  }

  async updatePin() {
    await this.pinService.updatePin2();
  }

  async createPin() {
    await this.pinService.createPin();
  }

  async resetPin() {
    await this.presentAlert(
      "You are about to reset your Transaction Pin",
      this.resetPinConfirmationAlert,
      "Confirm Reset"
    );
  }

  async presentAlert(header, msg, confirmText) {
    const alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            this.submitted = false;
          },
        },
        {
          text: confirmText,
          handler: async () => {
            this.authService.resetPin({}).subscribe(
              (data) => {
                console.log(
                  "%c This is the Update pin working",
                  "color: red; font-size: 1.3em"
                );
                console.log(data);
                this.presentSuccessAlert(data.message);
              },
              (error) => {
                console.log(
                  "%c This is the Update pin error",
                  "color: red; font-size: 1.3em"
                );
                console.log(error);
                this.presentToast(error.error.message);
              }
            );
          },
        },
      ],
    });
    await alert.present();
  }

  async presentChangeAlert(header, msg, confirmText) {
    const alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            this.submitted = false;
          },
        },
        {
          text: confirmText,
          handler: async () => {
            console.log(this.p);
            this.authService.changepassword(this.p).subscribe(
              (data) => {
                if (data.status === "success") {
                  this.presentSuccessAlert(data.message);
                  this.submitted = false;
                  this.resetPage();
                  this.nav.navigateForward("profile-settings");
                } else {
                  this.presentToast(data.message);
                  this.submitted = false;
                  this.resetPage();
                  this.nav.navigateForward("profile-settings");
                }
              },
              (error) => {
                console.log(error);
                this.presentToast(error.error.message);
                this.submitted = false;
                this.resetPage();
                this.nav.navigateForward("profile-settings");
              }
            );
          },
        },
      ],
    });
    await alert.present();
  }

  resetPage() {
    this.changePasswordForm.patchValue({
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    });

    this.changePass = false;
    this.submitted = false;
  }

  get p() {
    return this.changePasswordForm.value;
  }

  async presentSuccessAlert(message) {
    const alert = await this.alertController.create({
      header: "Success!",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  async presentToast(error) {
    const toast = await this.toastController.create({
      message: error,
      duration: 5000,
    });
    toast.present();
  }

  profileSettingsPage() {
    this.nav.navigateForward("profile-settings");
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      this.submitted = true;
      this.presentChangeAlert(
        "Confirm change",
        "Are you sure You want to change your password?",
        "Procceed"
      );
    }
  }

}
