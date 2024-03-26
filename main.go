package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/menu"
	"github.com/wailsapp/wails/v2/pkg/menu/keys"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()
	AppMenu := menu.NewMenu()
	FileMenu := AppMenu.AddSubmenu("Menu")
	FileMenu.AddText("Temporizador", keys.CmdOrCtrl("C"), func(_ *menu.CallbackData) {
		//runtime.WindowFullscreen(app.ctx)
		runtime.EventsEmit(app.ctx, "temporizadorShow", true)
	})
	FileMenu.AddSeparator()
	FileMenu.AddText("Tablero", keys.CmdOrCtrl("T"), func(_ *menu.CallbackData) {
		//runtime.WindowUnfullscreen(app.ctx)
		runtime.EventsEmit(app.ctx, "tableroShow", true)
	})
	FileMenu.AddSeparator()
	FileMenu.AddText("Salir", keys.Key("Escape"), func(_ *menu.CallbackData) {
		// fi, err := os.ReadFile("./build/windows/icon.ico")
		// if err != nil {
		// 	println("Error al leer el icono:", err.Error())
		// 	return
		// }

		result, err := runtime.MessageDialog(app.ctx, runtime.MessageDialogOptions{
			Type:          runtime.QuestionDialog,
			Title:         "Cerrar IMedicalApp",
			Message:       "Esta seguro de que quiere cerrar la aplicación?",
			DefaultButton: "No",
			//Icon:          fi,
		})
		if err != nil {
			println("Error:", err.Error())
		}
		if result == "Yes" {
			runtime.Quit(app.ctx)
		}
	})

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "IMedicalApp",
		Width:  1024,
		Height: 668,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		Windows: &windows.Options{
			WebviewIsTransparent:              false,
			WindowIsTranslucent:               false,
			BackdropType:                      windows.BackdropType(windows.Light),
			DisablePinchZoom:                  false,
			DisableWindowIcon:                 false,
			DisableFramelessWindowDecorations: false,
			WebviewUserDataPath:               "",
			WebviewBrowserPath:                "",
			Theme:                             windows.Theme(windows.Auto),
			CustomTheme: &windows.ThemeSettings{
				DarkModeTitleBar:   windows.RGB(204, 212, 255), // Red
				DarkModeTitleText:  int32(windows.Dark),
				DarkModeBorder:     windows.RGB(0, 0, 255),
				LightModeTitleBar:  windows.RGB(200, 200, 200),
				LightModeTitleText: windows.RGB(255, 0, 0),
				LightModeBorder:    windows.RGB(255, 0, 0),
				// Theme to use when window is inactive
				DarkModeTitleBarInactive:   windows.RGB(204, 212, 255),
				DarkModeTitleTextInactive:  int32(windows.Dark),
				DarkModeBorderInactive:     windows.RGB(0, 0, 128),
				LightModeTitleBarInactive:  windows.RGB(100, 100, 100),
				LightModeTitleTextInactive: windows.RGB(10, 10, 10),
				LightModeBorderInactive:    windows.RGB(100, 100, 100),
			},
		},

		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Menu:             AppMenu, // reference the menu above
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
