SET(SOURCES screens/ui_Screen1.c
    ui.c
    components/ui_comp_hook.c
    ui_helpers.c
    ui_events.cpp
    images/ui_img_sensor_png.c
    images/ui_img_text_v2_png.c)

add_library(ui ${SOURCES})
