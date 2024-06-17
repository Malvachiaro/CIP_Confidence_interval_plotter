// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{Manager, Window};


#[tauri::command]
async fn close_splashscreen(window: Window) {
  // Close splashscreen
  window.get_window("splashscreen").expect("no window labeled 'splashscreen' found").close().unwrap();
  // Show main window
  window.get_window("main").expect("no window labeled 'main' found").show().unwrap();
}


#[tauri::command]
fn close_app(window: tauri::Window) {
  window.close().unwrap();
}

#[tauri::command]
fn clear_cache(window: Window) {
    window.eval("location.reload(true);").unwrap();
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![close_splashscreen, close_app, clear_cache])
    .on_window_event(|event| {
      if let tauri::WindowEvent::CloseRequested { api, .. } = event.event() {
          // Impedire la chiusura immediata della finestra
          api.prevent_close();
          
          // Emetti l'evento 'close-requested' al frontend
          event.window().emit("tauri://close-requested", {}).unwrap();
      }
  })
  .run(tauri::generate_context!())
  .expect("error while running tauri application");
}