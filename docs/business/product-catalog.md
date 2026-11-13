# Product Catalog Taxonomy & Attribute Architecture

## 1. Product Domains Overview

The NovaStore catalog is organized into 8 comprehensive categories designed to support both standalone purchases and interactive configuration experiences:

```
+---------------------------------------------------------------------------------+
|                           NovaStore Product Catalog                             |
+---------------------------------------------------------------------------------+
  |
  +---> [ A. PC Components ]               : CPUs, GPUs, Motherboards, RAM, PSUs...
  +---> [ B. Prebuilt Computers ]          : Gaming PCs, Workstations, AI Dev Rigs...
  +---> [ C. Monitors and Displays ]       : Gaming Displays, Professional, Arms...
  +---> [ D. Gaming Peripherals ]          : Mechanical Keyboards, Mice, Headsets...
  +---> [ E. Mechanical Keyboard Parts ]   : Kits, Switches, Keycaps, Plates, PCBs...
  +---> [ F. Desk Setup ]                  : Desks, Ergonomic Chairs, Lighting, Arms...
  +---> [ G. Networking ]                  : Routers, Switches, Wi-Fi Cards, Cabling...
  +---> [ H. Storage & Connectivity ]      : External SSDs, Thunderbolt Docks, Hubs...
```

---

## 2. Category Breakdown & Essential Technical Attributes

### Category A: PC Components

- **CPU**: Socket (e.g. AM5, LGA1700), Cores/Threads, Base/Boost Clock, TDP (W), Integrated GPU, PCIe Generation, Memory Support (DDR4/DDR5).
- **GPU**: Chipset (e.g. RTX 4080, RX 7900 XTX), VRAM (GB, GDDR6X), Length (mm), Thickness (slots), TGP/Power (W), Recommended PSU (W), Display Outputs (HDMI, DP).
- **Motherboard**: Socket, Chipset, Form Factor (ATX, Micro-ATX, Mini-ITX), Memory Slots (DDR4/DDR5, Max Capacity), PCIe x16 Slots, M.2 Slots, Wi-Fi Built-in.
- **RAM**: Memory Type (DDR4/DDR5), Capacity per Stick, Module Count, Frequency (MT/s), CAS Latency (CL), Form Factor (DIMM/SO-DIMM), RGB.
- **Storage (Internal SSD/HDD)**: Form Factor (M.2 2280, 2.5", 3.5"), Interface (PCIe Gen4x4, Gen5x4, SATA III), Capacity (GB/TB), Read/Write Speeds (MB/s).
- **Power Supply (PSU)**: Wattage (W), 80 Plus Certification (Bronze, Gold, Platinum), Modularity (Full, Semi, Non), Form Factor (ATX, SFX), 12VHPWR PCIe 5.0 Support.
- **PC Case**: Supported Motherboard Form Factors, Maximum GPU Length (mm), Maximum CPU Cooler Height (mm), Radiator Support (120/240/280/360mm), Included Fans.
- **CPU Cooler**: Type (Air / AIO Liquid), Radiator Size (mm), Fan Count, Supported Sockets, Max TDP Dissipation, Height (mm for Air Coolers).
- **Fans, Thermal Paste, Expansion Cards**: Dimensions, CFM, Static Pressure, Thermal Conductivity (W/mK).

### Category B: Prebuilt Computers

- **Target Profiles**: Gaming PCs (Entry, Mid, Ultra), Creative Workstations, AI/Data Science Desktops, Office Systems.
- **Attributes**: Base Component Bill-of-Materials (BOM), Assembly Guarantee, Benchmark Performance Index, Operating System, Chassis Dimensions.

### Category C: Monitors and Displays

- **Attributes**: Screen Size (inches), Resolution (FHD, 2K QHD, 4K UHD), Panel Technology (IPS, Fast IPS, VA, OLED), Refresh Rate (Hz), Response Time (ms GtG), Color Gamut (sRGB, DCI-P3), HDR Tier, Video Inputs, VESA Mount Compatibility (75x75, 100x100).

### Category D: Gaming Peripherals

- **Mechanical Keyboards**: Layout size (60%, 65%, 75%, TKL, Full-size), Connectivity (Wired, 2.4GHz, Bluetooth), Switch Brand/Type, Backlight (RGB/White).
- **Gaming Mice**: Sensor, DPI, Polling Rate (1000Hz-8000Hz), Weight (g), Connectivity, Grip Style.
- **Headsets, Microphones, Webcams, Mousepads, Controllers**: Acoustic specs, Polar patterns, Resolution/FPS, Surface friction type.

### Category E: Mechanical Keyboard Components

- **Keyboard Kit / Case**: Material (CNC Aluminum, Acrylic, Polycarbonate), Mount Style (Gasket, Tray, Top), Angle, Weight.
- **Switches**: Type (Linear, Tactile, Clicky), Actuation Force (gf), Bottom-out Force, Travel Distance, Pins (3-pin, 5-pin), Factory Lubed.
- **Keycaps**: Profile (Cherry, OEM, XDA, SA), Material (PBT, ABS), Printing Method (Double-shot, Dye-sub).
- **Plates & Stabilizers**: Material (FR4, Polycarbonate, Aluminum, Brass), Mount (Plate-mount, Screw-in PCB mount).
- **PCBs**: Hot-swap vs Solder, Per-key RGB, QMK/VIA Programmable, Thickness (1.2mm, 1.6mm).

### Category F: Desk Setup

- **Desks**: Dimensions (Width x Depth x Height mm), Electric Dual/Single Motor, Load Capacity (kg), Cable Management Tray.
- **Chairs**: Ergonomic adjustments (lumbar, 4D armrests, headrest), Recline angle, Max recommended weight and height.
- **Monitor Arms**: Supported Screen Sizes, Weight Capacity per Arm (kg), Mounting Type (C-clamp, Grommet), Gas Spring.

### Category G: Networking

- **Attributes**: Wi-Fi Standard (Wi-Fi 6, 6E, 7), Speed Rating (AX3000, BE9300), Ethernet Ports (1GbE, 2.5GbE, 10GbE), Managed Features.

### Category H: Storage and Connectivity

- **Attributes**: Enclosure Interface (Thunderbolt 4, USB 3.2 Gen 2x2), Transfer Speed, Port Expansion Configurations.

---

## 3. Extensibility Architecture

To avoid modifying database tables every time a new component category is introduced, the database design in Phase 2 will utilize a flexible attribute model:

- Core catalog tables hold universal metadata (SKU, brand, title, slug, category, warranty, status).
- Domain-specific specifications are stored via structured JSON / EAV schemas, allowing seamless introduction of future categories without schema migrations.
