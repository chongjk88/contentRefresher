function now() {
  const wsmHeader = document.querySelector("header.wsmMainHeader");
  const refreshButton = document.createElement("div");

  wsmHeader.appendChild(refreshButton);
  refreshButton.textContent = "↻";
  refreshButton.style.display = "block";
  refreshButton.style.cursor = "pointer";
  refreshButton.style.position = "absolute";
  refreshButton.style.left = "50%";
  refreshButton.style.transform = "translateX(-50%)";
  refreshButton.style.fontSize = "20px";
  refreshButton.style.fontFamily = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'";

  if(window.location.href.indexOf("editSite.do") > -1) {
      refreshButton.setAttribute("title", "Click to refresh current page");

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

      const seoFrame = jQuery("iframe#siteToolView").contents();
      const blogTab = seoFrame.find("span:contains('Blog')");

      if (blogTab.hasClass("ng-binding")) {

          refreshButton.setAttribute("title", "Click to refresh Blog Creator");

          const socialButton = document.createElement("div");
          wsmHeader.appendChild(socialButton);
          socialButton.setAttribute("title", "Click to open Blog Creator in a new window");
          socialButton.textContent = "Open Blog Creator";
          socialButton.style.display = "block";
          socialButton.style.cursor = "pointer";
          socialButton.style.position = "absolute";
          socialButton.style.top = "30px";
          socialButton.style.left = "50%";
          socialButton.style.transform = "translateX(-50%)";
          socialButton.style.fontSize = "12px";
          socialButton.style.fontFamily = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'";

          refreshButton.onclick = function() {

              if (blogTab.parent().parent().hasClass("active")) {

                  const contentFrame = jQuery("iframe#siteToolView").contents();
                  const blogEditorIframe = contentFrame.find("iframe#blogEditorFrame").attr("src");

                  contentFrame.find("iframe#blogEditorFrame").attr("src", blogEditorIframe);
              } else {
                  alert("This only works on the Blog tab");
              }
          };
          socialButton.onclick = function() {
              const getWebId = Cobalt.ModulesData["Cobalt.WSM.Common.SiteInfoModule"].siteMetaInfo[0].value;
              window.open("https://reputationmanagement.cdk.com/tab/mvc/publisher/page?requestChannel=WSM&webId=" + getWebId + "&locale=null",'_blank');
          };
      } else {
          refreshButton.style.display = "none";
      }
  }
}
window.onload = now;