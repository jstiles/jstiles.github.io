Appending URL Issue
At 5:00 of the following video, I write an 'if' statement with an includes method that has 2 parameters, but I didn't realize at the time that it can only have one. This caused a bug that appended an extra https// to the URL, causing it not to work. There was a change made to the final code, which you can download in my last lecture, or on Github.

// Old Version
if (!urlValue.includes('http://', 'https://')) {     
    urlValue = `https://${urlValue}`; 
} 
 
// New Version
if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
     urlValue = `https://${urlValue}`; 
}