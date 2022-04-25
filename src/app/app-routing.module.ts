import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CompleteProfileGuard } from './guards/complete-profile.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { TutorialGuard } from './guards/tutorial.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [UserGuard],
  },
  {
    path: 'bill-payments',
    loadChildren: () => import('./pages/bill-payments/bill-payments.module').then( m => m.BillPaymentsPageModule)
  },
  {
    path: 'airtime',
    loadChildren: () => import('./pages/airtime/airtime.module').then( m => m.AirtimePageModule)
  },
  {
    path: 'send-money',
    loadChildren: () => import('./pages/send-money/send-money.module').then( m => m.SendMoneyPageModule)
  },
  {
    path: 'send-to-wallet',
    loadChildren: () => import('./pages/send-to-wallet/send-to-wallet.module').then( m => m.SendToWalletPageModule)
  },
  {
    path: 'merchant',
    loadChildren: () => import('./pages/merchant/merchant.module').then( m => m.MerchantPageModule)
  },
  {
    path: 'fav-merchant',
    loadChildren: () => import('./pages/fav-merchant/fav-merchant.module').then( m => m.FavMerchantPageModule)
  },
  {
    path: 'pay-merchant',
    loadChildren: () => import('./pages/pay-merchant/pay-merchant.module').then( m => m.PayMerchantPageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./pages/success/success.module').then( m => m.SuccessPageModule)
  },
  {
    path: 'zit-booster',
    loadChildren: () => import('./pages/zit-booster/zit-booster.module').then( m => m.ZitBoosterPageModule)
  },
  {
    path: 'type',
    loadChildren: () => import('./pages/type/type.module').then( m => m.TypePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'merchant-dashboard',
    loadChildren: () => import('./pages/merchant-dashboard/merchant-dashboard.module').then( m => m.MerchantDashboardPageModule)
  },
  {
    path: 'zit-conversion',
    loadChildren: () => import('./pages/zit-conversion/zit-conversion.module').then( m => m.ZitConversionPageModule)
  },
  {
    path: 'wallet-selection',
    loadChildren: () => import('./pages/wallet-selection/wallet-selection.module').then( m => m.WalletSelectionPageModule)
  },
  {
    path: 'boosted',
    loadChildren: () => import('./pages/boosted/boosted.module').then( m => m.BoostedPageModule)
  },
  {
    path: 'fund-wallet',
    loadChildren: () => import('./pages/fund-wallet/fund-wallet.module').then( m => m.FundWalletPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'verify',
    loadChildren: () => import('./pages/verify/verify.module').then( m => m.VerifyPageModule)
  },
  {
    path: 'register-merchant',
    loadChildren: () => import('./pages/register-merchant/register-merchant.module').then( m => m.RegisterMerchantPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./pages/help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'success-check',
    loadChildren: () => import('./pages/success-check/success-check.module').then( m => m.SuccessCheckPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'select-biller',
    loadChildren: () => import('./pages/select-biller/select-biller.module').then( m => m.SelectBillerPageModule)
  },
  {
    path: 'select-product',
    loadChildren: () => import('./pages/select-product/select-product.module').then( m => m.SelectProductPageModule)
  },
  {
    path: 'confirm-transaction',
    loadChildren: () => import('./pages/confirm-transaction/confirm-transaction.module').then( m => m.ConfirmTransactionPageModule)
  },
  {
    path: 'enter-details',
    loadChildren: () => import('./pages/enter-details/enter-details.module').then( m => m.EnterDetailsPageModule)
  },
  {
    path: 'payment-receipt',
    loadChildren: () => import('./pages/payment-receipt/payment-receipt.module').then( m => m.PaymentReceiptPageModule)
  },
  {
    path: 'send-to-bank',
    loadChildren: () => import('./pages/send-to-bank/send-to-bank.module').then( m => m.SendToBankPageModule)
  },
  {
    path: 'select-bank',
    loadChildren: () => import('./pages/select-bank/select-bank.module').then( m => m.SelectBankPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'check-mail',
    loadChildren: () => import('./pages/check-mail/check-mail.module').then( m => m.CheckMailPageModule)
  },
  {
    path: 'new-password',
    loadChildren: () => import('./pages/new-password/new-password.module').then( m => m.NewPasswordPageModule)
  },
  {
    path: 'choose-wallet',
    loadChildren: () => import('./pages/choose-wallet/choose-wallet.module').then( m => m.ChooseWalletPageModule)
  },
  {
    path: 'select-billers',
    loadChildren: () => import('./pages/select-billers/select-billers.module').then( m => m.SelectBillersPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'select-biller-airtime',
    loadChildren: () => import('./pages/select-biller-airtime/select-biller-airtime.module').then( m => m.SelectBillerAirtimePageModule)
  },
  {
    path: 'select-product-cable',
    loadChildren: () => import('./pages/select-product-cable/select-product-cable.module').then( m => m.SelectProductCablePageModule)
  },
  {
    path: 'confirm-transaction-product',
    loadChildren: () => import('./pages/confirm-transaction-product/confirm-transaction-product.module').then( m => m.ConfirmTransactionProductPageModule)
  },
  {
    path: 'zit-status',
    loadChildren: () => import('./pages/zit-status/zit-status.module').then( m => m.ZitStatusPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./pages/history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'history-details',
    loadChildren: () => import('./pages/history-details/history-details.module').then( m => m.HistoryDetailsPageModule)
  },
  {
    path: 'zit-prices',
    loadChildren: () => import('./pages/zit-prices/zit-prices.module').then( m => m.ZitPricesPageModule)
  },
  {
    path: 'extra-wallet',
    loadChildren: () => import('./pages/extra-wallet/extra-wallet.module').then( m => m.ExtraWalletPageModule)
  },
  {
    path: 'loan',
    loadChildren: () => import('./pages/loan/loan.module').then( m => m.LoanPageModule)
  },
  {
    path: 'access-loan',
    loadChildren: () => import('./pages/access-loan/access-loan.module').then( m => m.AccessLoanPageModule)
  },
  {
    path: 'insurance',
    loadChildren: () => import('./pages/insurance/insurance.module').then( m => m.InsurancePageModule)
  },
  {
    path: 'monthly-pension',
    loadChildren: () => import('./pages/monthly-pension/monthly-pension.module').then( m => m.MonthlyPensionPageModule)
  },
  {
    path: 'internet',
    loadChildren: () => import('./pages/internet/internet.module').then( m => m.InternetPageModule)
  },
  {
    path: 'internet-billers',
    loadChildren: () => import('./pages/internet-billers/internet-billers.module').then( m => m.InternetBillersPageModule)
  },
  {
    path: 'internet-plans',
    loadChildren: () => import('./pages/internet-plans/internet-plans.module').then( m => m.InternetPlansPageModule)
  },
  {
    path: 'electricity',
    loadChildren: () => import('./pages/electricity/electricity.module').then( m => m.ElectricityPageModule)
  },
  {
    path: 'electricity-billers',
    loadChildren: () => import('./pages/electricity-billers/electricity-billers.module').then( m => m.ElectricityBillersPageModule)
  },
  {
    path: 'choose-servicid',
    loadChildren: () => import('./pages/choose-servicid/choose-servicid.module').then( m => m.ChooseServicidPageModule)
  },
  {
    path: 'send-to-merchantid',
    loadChildren: () => import('./pages/send-to-merchantid/send-to-merchantid.module').then( m => m.SendToMerchantidPageModule)
  },
  {
    path: 'iframe',
    loadChildren: () => import('./modal/iframe/iframe.module').then( m => m.IframePageModule)
  },
  {
    path: 'education',
    loadChildren: () => import('./pages/education/education.module').then( m => m.EducationPageModule)
  },
  {
    path: 'waec',
    loadChildren: () => import('./pages/waec/waec.module').then( m => m.WaecPageModule)
  },
  {
    path: 'jamb',
    loadChildren: () => import('./pages/jamb/jamb.module').then( m => m.JambPageModule)
  },
  {
    path: 'choose-waec-card',
    loadChildren: () => import('./pages/choose-waec-card/choose-waec-card.module').then( m => m.ChooseWaecCardPageModule)
  },
  {
    path: 'choose-jamb-card',
    loadChildren: () => import('./pages/choose-jamb-card/choose-jamb-card.module').then( m => m.ChooseJambCardPageModule)
  },
  {
    path: 'view-loan',
    loadChildren: () => import('./pages/view-loan/view-loan.module').then( m => m.ViewLoanPageModule)
  },
  {
    path: 'loan-payment',
    loadChildren: () => import('./pages/loan-payment/loan-payment.module').then( m => m.LoanPaymentPageModule)
  },
  {
    path: 'loan-history',
    loadChildren: () => import('./pages/loan-history/loan-history.module').then( m => m.LoanHistoryPageModule)
  },
  {
    path: 'merchant-settings',
    loadChildren: () => import('./pages/merchant-settings/merchant-settings.module').then( m => m.MerchantSettingsPageModule)
  },
  {
    path: 'create-merchant-profile',
    loadChildren: () => import('./pages/create-merchant-profile/create-merchant-profile.module').then( m => m.CreateMerchantProfilePageModule)
  },
  {
    path: 'set-reward',
    loadChildren: () => import('./pages/set-reward/set-reward.module').then( m => m.SetRewardPageModule)
  },
  {
    path: 'merchant-services',
    loadChildren: () => import('./pages/merchant-services/merchant-services.module').then( m => m.MerchantServicesPageModule)
  },
  {
    path: 'activate-account',
    loadChildren: () => import('./pages/activate-account/activate-account.module').then( m => m.ActivateAccountPageModule)
  },
  {
    path: 'show-all-loans',
    loadChildren: () => import('./pages/show-all-loans/show-all-loans.module').then( m => m.ShowAllLoansPageModule)
  },
  {
    path: 'user-settings',
    loadChildren: () => import('./pages/user-settings/user-settings.module').then( m => m.UserSettingsPageModule)
  },
  {
    path: 'prev-loans',
    loadChildren: () => import('./pages/prev-loans/prev-loans.module').then( m => m.PrevLoansPageModule)
  },
  {
    path: 'lifeline',
    loadChildren: () => import('./pages/lifeline/lifeline.module').then( m => m.LifelinePageModule)
  },
  {
    path: 'days-select',
    loadChildren: () => import('./pages/days-select/days-select.module').then( m => m.DaysSelectPageModule)
  },
  {
    path: 'transaction-history',
    loadChildren: () => import('./pages/transaction-history/transaction-history.module').then( m => m.TransactionHistoryPageModule)
  },
  {
    path: 'upgrade-account',
    loadChildren: () => import('./pages/upgrade-account/upgrade-account.module').then( m => m.UpgradeAccountPageModule)
  },
  {
    path: 'activate-wallet',
    loadChildren: () => import('./pages/activate-wallet/activate-wallet.module').then( m => m.ActivateWalletPageModule)
  },
  {
    path: 'security-settings',
    loadChildren: () => import('./pages/security-settings/security-settings.module').then( m => m.SecuritySettingsPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'merchant-profile',
    loadChildren: () => import('./pages/merchant-profile/merchant-profile.module').then( m => m.MerchantProfilePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
