function now() {
  const wsmHeader = document.querySelector("header.wsmMainHeader");
  const refreshButton = document.createElement("div");

  wsmHeader.appendChild(refreshButton);
  refreshButton.id = "testHi";

  refreshButton.textContent = "↻";
  refreshButton.style.display = "block";
  refreshButton.style.cursor = "pointer";
  refreshButton.style.position = "absolute";
  refreshButton.style.left = "50%";
  refreshButton.style.transform = "translateX(-50%)";
  refreshButton.style.fontSize = "20px";
  refreshButton.style.fontFamily = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'";

  if(window.location.href.indexOf("editSite.do") > -1) {
      refreshButton.onclick = function() {
          const contentFrame = jQuery("iframe#cblt_content").contents();
          const siteEditorIframe = contentFrame.find("iframe#siteEditorIframe").contents();
          const viewerIframe = siteEditorIframe.find("iframe#viewer").contents();
          const pageName = siteEditorIframe.find("div#pageOutlineConfigurator > div > span#pageName").attr("data-page-name");

          if(window.location.href.indexOf("&pageName=") > -1) {
              window.location = location.href.split('&pageName=')[0] + "&pageName=" + pageName;

              console.log("already");
          } else {
              window.location = location.href + "&pageName=" + pageName;
          }
      };
  }

  if(window.location.href.indexOf("seo_performance.mvc") > -1) {
      refreshButton.onclick = function() {
          const contentFrame = jQuery("iframe#siteToolView").contents();
          const blogEditorIframe = contentFrame.find("iframe#blogEditorFrame").attr("src");

          contentFrame.find("iframe#blogEditorFrame").attr("src", blogEditorIframe);
      };
  }
}
window.onload = now;