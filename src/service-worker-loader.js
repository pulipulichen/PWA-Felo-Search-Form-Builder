let enableServiceWorker = ('serviceWorker' in navigator)
// enableServiceWorker = false 

// 
if (location.href.startsWith('http://127.0.0.1') || 
    location.href.startsWith('http://localhost') ||
    location.href.startsWith('https://dangerous-lizard-99.telebit.io/')) {
  enableServiceWorker = false
} 

if (enableServiceWorker) {  // 不使用service-worker快取，這樣會無法安裝
//if ('serviceWorker' in navigator) {  
  navigator.serviceWorker.register('./service-worker.js')
    .then(function (registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);

      // // This variable will save the event for later use.
      // let deferredPrompt;
      // window.addEventListener('beforeinstallprompt', (e) => {
      //   // Prevents the default mini-infobar or install dialog from appearing on mobile
      //   e.preventDefault();
      //   // Save the event because you'll need to trigger it later.
      //   deferredPrompt = e;
      //   // Show your customized install prompt for your PWA
      //   // Your own UI doesn't have to be a single element, you
      //   // can have buttons in different locations, or wait to prompt
      //   // as part of a critical journey.
      //   showInAppInstallPromotion();
      // });
    }, function (err) {

      // registration failed
      console.log('ServiceWorker registration failed: ', err);
    });
}