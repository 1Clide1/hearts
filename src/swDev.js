export default function serviceWorker() {
  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker.register(swUrl).then((res) => {
    console.log(`${res} service worker ready`);
  });
}
