let color = '#3aa757';
let text = '#fff';
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
  chrome.storage.sync.set({ text });
  console.log('Default text color set to %cwhite', `color: ${text}`);
  console.log(
    `Definições em Storage Sync ${chrome.storage.sync.get((e) =>
      console.log(e),
    )}`,
  );
});
