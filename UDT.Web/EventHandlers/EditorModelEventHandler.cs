using System;
using System.Linq;
using Umbraco.Core;
using Umbraco.Web.Editors;

namespace UDT.Web.EventHandlers
{
    public class EditorModelEventHandler : ApplicationEventHandler
    {
        protected override void ApplicationStarted(UmbracoApplicationBase umbracoApplication, ApplicationContext applicationContext)
        {
            //Here we are binding the new method we created below to the SendingContentModel event.
            EditorModelEventManager.SendingContentModel += EditorModelEventManager_SendingContentModel;
        }

        /// <summary>
        /// This method adds some default values to the model properties when the SendingContentModel event is fired.
        /// </summary>
        private void EditorModelEventManager_SendingContentModel(System.Web.Http.Filters.HttpActionExecutedContext sender, 
            EditorModelEventArgs<Umbraco.Web.Models.ContentEditing.ContentItemDisplay> e)
        {
            if (e.Model.ContentTypeAlias == "blogpost")
            {
                var articleDate = e.Model.Properties.FirstOrDefault(x => x.Alias == "articleDate");
                if (articleDate != null && (articleDate.Value == null || string.IsNullOrWhiteSpace(articleDate.Value.ToString())))
                {
                    articleDate.Value = DateTime.Now.Date;
                }
            }
        }
    }
}