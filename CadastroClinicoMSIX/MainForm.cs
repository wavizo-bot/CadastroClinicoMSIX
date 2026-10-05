using System;
using System.IO;
using System.Windows.Forms;
using Microsoft.Web.WebView2.WinForms;
using Microsoft.Web.WebView2.Core;

namespace CadastroClinicoMSIX
{
    public class MainForm : Form
    {
        private WebView2 webView;

        public MainForm()
        {
            this.Text = "Cadastro Clínico";
            this.Width = 1280;
            this.Height = 800;
            this.StartPosition = FormStartPosition.CenterScreen;
            this.MinimumSize = new System.Drawing.Size(800, 600);

            webView = new WebView2();
            webView.Dock = DockStyle.Fill;
            this.Controls.Add(webView);

            this.Load += async (sender, e) =>
            {
                try
                {
                    await webView.EnsureCoreWebView2Async();
                    var exePath = AppDomain.CurrentDomain.BaseDirectory;
                    var webPath = Path.Combine(exePath, "web");
                    var indexPath = Path.Combine(webPath, "index.html");
                    webView.CoreWebView2.Navigate($"file:///{indexPath.Replace("\\", "/")}");
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Erro ao carregar o aplicativo: {ex.Message}", "Erro", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            };
        }

        protected override void OnFormClosed(FormClosedEventArgs e)
        {
            webView?.Dispose();
            base.OnFormClosed(e);
        }
    }
}
