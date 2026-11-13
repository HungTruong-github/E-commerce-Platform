# Core Customer Configuration Experiences

NovaStore provides three distinct configuration experiences tailored to different customer purchasing journeys:

```text
+-----------------------------------------------------------------------------------+
|                        NovaStore Customer Experiences                             |
+-----------------------------------------------------------------------------------+
       |                                |                                   |
       v                                v                                   v
[ 1. PC Builder ]            [ 2. Full Setup Builder ]         [ 3. Product Customizer ]
  Hardware compatibility       Holistic workspace & battle-      Modular configurable products
  Component-level rules        station ergonomic planner         (Mechanical Keyboards)
```

---

## 1. Experience 1: The Interactive PC Builder

The **PC Builder** is an interactive, step-by-step configurator designed for enthusiasts and gamers assembling a desktop computer from bare components.

### Selected Components:

1. Processor (CPU)
2. CPU Cooler (Air Cooler or AIO Liquid Cooler)
3. Motherboard (Mainboard)
4. Memory (RAM)
5. Primary & Secondary Storage (NVMe M.2 SSD / SATA HDD)
6. Graphics Card (GPU)
7. Power Supply Unit (PSU)
8. Computer Case (Chassis)
9. Case Fans & Thermal Paste
10. Optional Operating System & Assembly Service

### Planned Compatibility Engine Rules:

- **Socket Matching**: CPU socket must physically and logically match Motherboard socket (e.g. AMD AM5 vs Intel LGA1700).
- **RAM Generation & Slots**: Motherboard DDR generation (DDR4 vs DDR5) must match RAM type; total RAM modules must not exceed available motherboard DIMM slots.
- **Form Factor Clearance**: Motherboard form factor (E-ATX, ATX, Micro-ATX, Mini-ITX) must be supported by the selected Case.
- **GPU Dimensions vs Chassis**: GPU length (mm) must not exceed Case max GPU clearance (accounting for front-mounted AIO radiators/fans).
- **CPU Cooler Height**: Air cooler height (mm) must not exceed Case max CPU cooler clearance; Liquid AIO radiator size (240mm, 280mm, 360mm) must be mountable in top or front case brackets.
- **PSU Wattage Overhead**: Estimated total system wattage = `(CPU TDP + GPU TGP + Motherboard/Peripherals 75W) * 1.3 safety margin`. PSU wattage must meet or exceed this value.
- **Storage Interfaces**: Total M.2 NVMe drives must not exceed Motherboard available M.2 slots.

---

## 2. Experience 2: The Full Gaming & Workstation Setup Builder

The **Full Setup Builder** is **not** merely another PC Builder. It is an ergonomic and aesthetic workstation planner that coordinates an entire battle-station or creative studio environment.

### Scope of the Experience:

- **Core Computing Core**: Prebuilt PC, Custom PC build, or High-performance Laptop with Docking Station.
- **Visual Display Stack**: Primary Gaming Monitor, Secondary Productivity Monitor, Dual-Monitor Gas Spring Arm.
- **Peripherals Suite**: Mechanical Keyboard, Gaming Mouse, Desk Mat, Audio Headset / Studio Monitors, Broadcast Microphone, Stream Webcam.
- **Ergonomic Furniture**: Height-adjustable Standing Desk, Ergonomic Mesh / Gaming Chair.
- **Atmosphere & Organization**: Desk Lightbar, Ambient RGB Accent Lighting, Under-desk Cable Management Raceways.

### Planned Setup Validation Checks:

- **Display Output & Bandwidth**: Ensuring the selected PC/GPU or Laptop dock has sufficient HDMI 2.1 / DisplayPort 1.4/2.1 outputs to drive the chosen displays at their native resolution and refresh rates (e.g. Dual 4K 144Hz requires specific bandwidth capabilities).
- **Monitor Mounting & Arm Capacity**: Verifying that monitor weights (excluding base) do not exceed the monitor arm's maximum payload (e.g., 9kg per arm), and that monitor VESA patterns match the arm brackets.
- **Desk Dimensions vs Equipment Footprint**: Verifying that desk width (e.g., 1400mm) adequately accommodates dual 27-inch monitors without overhang.
- **Power & Connectivity Infrastructure**: Ensuring sufficient wall power sockets and USB ports/hubs for all selected accessories.

---

## 3. Experience 3: The Modular Product Customizer

The **Product Customizer** provides an in-depth assembly experience for products composed of swappable, modular components. The flagship experience is the **Mechanical Keyboard Customizer**:

### Customizable Component Layers:

1. **Form Factor / Layout**: 60%, 65%, 75%, TKL (Tenkeyless), 96%, or 100% Full-size.
2. **Keyboard Case**: Material (CNC Anodized Aluminum, Polycarbonate, Acrylic), Colorway, Weight bar.
3. **Internal Mounting Style**: Gasket mount, Top mount, Sandwich mount, or Tray mount.
4. **Switch Plate**: Material choice affecting sound profile and typing flex (FR4, Polycarbonate, Aluminum, Brass).
5. **PCB (Printed Circuit Board)**: Hot-swap sockets vs Solder-only, RGB per-key backlighting, VIA/QMK firmware programmability.
6. **Stabilizers**: Screw-in PCB mount vs Snap-in plate mount; Lubed & Tuned options.
7. **Switches**: Switch variety (Linear, Tactile, Silent, Clicky), Actuation weight, Factory lubed vs Hand lubed.
8. **Keycaps**: Profile (Cherry, OEM, XDA, KAT, SA), Material (PBT Double-shot, ABS Dye-sub), Language legends.
9. **Accessories**: Coiled aviator cables, Sound-dampening switch pads, Custom wrist rests.

### Planned Customizer Validation Rules:

- Plate layout must match PCB layout (ISO vs ANSI, split spacebar, Tsangan bottom row).
- Stabilizer mount style must match PCB thickness (1.2mm vs 1.6mm PCBs require specific shims).
- Switch pin configuration (5-pin vs 3-pin) must match PCB hot-swap socket compatibility.

---

## 4. Phase 0 Implementation Notice

All three customer experiences are formally architected in Phase 0 specifications. No user interface configurators or business calculation algorithms are implemented in Phase 0 code. Implementation will proceed sequentially in designated subsequent phases.
