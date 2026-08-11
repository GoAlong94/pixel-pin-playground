/**
 * Mock data layer. Swap these functions for Lovable Cloud queries later —
 * the shapes match the intended `parts` / `platforms` tables.
 */

export type PartCategory = "Microcontrollers" | "Sensors" | "Displays" | "Power";

export type Part = {
  id: string;
  name: string;
  category: PartCategory;
  pins: number;
  description: string;
  color: string;
  width: number;
  height: number;
  custom?: boolean;
  isPublic?: boolean;
};

export type Platform = {
  id: string;
  name: string;
  mcu: string;
  clock: string;
};

export const platforms: Platform[] = [
  { id: "uno", name: "Arduino UNO", mcu: "ATmega328P", clock: "16 MHz" },
  { id: "esp32s3", name: "ESP32-S3", mcu: "Xtensa LX7", clock: "240 MHz" },
  { id: "rpi5", name: "Raspberry Pi 5", mcu: "BCM2712", clock: "2.4 GHz" },
  { id: "jetson", name: "Jetson Orin Nano", mcu: "Ampere GPU", clock: "1.5 GHz" },
];

export const mockParts: Part[] = [
  {
    id: "arduino-uno",
    name: "Arduino UNO R3",
    category: "Microcontrollers",
    pins: 32,
    description: "AVR dev board, 14 digital / 6 analog",
    color: "var(--color-signal)",
    width: 180,
    height: 120,
  },
  {
    id: "esp32-s3",
    name: "ESP32-S3 DevKit",
    category: "Microcontrollers",
    pins: 44,
    description: "Wi-Fi + BLE dual core",
    color: "var(--color-primary)",
    width: 160,
    height: 130,
  },
  {
    id: "rpi-5",
    name: "Raspberry Pi 5",
    category: "Microcontrollers",
    pins: 40,
    description: "Linux SBC, 40-pin GPIO header",
    color: "var(--color-chart-4)",
    width: 200,
    height: 140,
  },
  {
    id: "jetson-orin",
    name: "Jetson Orin Nano",
    category: "Microcontrollers",
    pins: 40,
    description: "Edge AI module, 40 TOPS",
    color: "var(--color-chart-3)",
    width: 200,
    height: 150,
  },
  {
    id: "breadboard",
    name: "Breadboard 830",
    category: "Power",
    pins: 830,
    description: "Full-size solderless breadboard",
    color: "var(--color-muted-foreground)",
    width: 260,
    height: 110,
  },
  {
    id: "dht22",
    name: "DHT22",
    category: "Sensors",
    pins: 4,
    description: "Temp + humidity, 1-wire",
    color: "var(--color-chart-2)",
    width: 90,
    height: 80,
  },
  {
    id: "mpu6050",
    name: "MPU-6050",
    category: "Sensors",
    pins: 8,
    description: "6-axis IMU over I2C",
    color: "var(--color-chart-2)",
    width: 100,
    height: 70,
  },
  {
    id: "hcsr04",
    name: "HC-SR04",
    category: "Sensors",
    pins: 4,
    description: "Ultrasonic ranger, 2–400 cm",
    color: "var(--color-chart-2)",
    width: 120,
    height: 70,
  },
  {
    id: "ssd1306",
    name: "SSD1306 OLED",
    category: "Displays",
    pins: 4,
    description: "128x64 monochrome, I2C",
    color: "var(--color-chart-1)",
    width: 120,
    height: 80,
  },
  {
    id: "lcd1602",
    name: "LCD 1602",
    category: "Displays",
    pins: 16,
    description: "Character LCD with HD44780",
    color: "var(--color-chart-1)",
    width: 160,
    height: 70,
  },
  {
    id: "ws2812",
    name: "WS2812B Strip",
    category: "Displays",
    pins: 3,
    description: "Addressable RGB, 8 px",
    color: "var(--color-chart-5)",
    width: 180,
    height: 50,
  },
  {
    id: "lipo",
    name: "LiPo 3.7V 2000mAh",
    category: "Power",
    pins: 2,
    description: "Single-cell battery pack",
    color: "var(--color-chart-5)",
    width: 130,
    height: 80,
  },
  {
    id: "buck",
    name: "Buck Converter",
    category: "Power",
    pins: 4,
    description: "Adjustable 3A step-down",
    color: "var(--color-chart-3)",
    width: 110,
    height: 80,
  },
];

export const partCategories: PartCategory[] = [
  "Microcontrollers",
  "Sensors",
  "Displays",
  "Power",
];

/** Placeholder for a future Cloud query: `select * from parts`. */
export async function fetchParts(): Promise<Part[]> {
  return mockParts;
}

export const initialFiles: Record<string, string> = {
  "main.cpp": `#include <Arduino.h>
#include "custom_chip.h"

#define LED_PIN 13
#define SENSOR_PIN A0

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  chip_init(SENSOR_PIN);
}

void loop() {
  uint16_t raw = analogRead(SENSOR_PIN);
  float temp = chip_read_celsius(raw);

  Serial.printf("temp = %.2f C\\n", temp);
  digitalWrite(LED_PIN, temp > 30.0f ? HIGH : LOW);
  delay(250);
}
`,
  "config.json": `{
  "target": "esp32-s3",
  "clock_mhz": 240,
  "flash_mb": 8,
  "psram": true,
  "peripherals": [
    { "id": "dht22", "bus": "gpio", "pin": 4 },
    { "id": "ssd1306", "bus": "i2c", "addr": "0x3C" }
  ],
  "simulation": { "timescale": "1ns", "trace": true }
}
`,
  "custom_chip.c": `#include <stdint.h>
#include <math.h>

static uint8_t s_pin;

void chip_init(uint8_t pin) {
  s_pin = pin;
}

/* NTC thermistor -> celsius (Steinhart-Hart) */
float chip_read_celsius(uint16_t raw) {
  const float beta = 3950.0f;
  float r = 10000.0f * (1023.0f / (float)raw - 1.0f);
  float t = 1.0f / (logf(r / 10000.0f) / beta + 1.0f / 298.15f);
  return t - 273.15f;
}
`,
};
