---
name: OPC之路 × TONK
description: Personal dreams and growth in a tactile paper journal
colors:
  black: "#20211e"
  cream: "#eee9dd"
  paper: "#faf6ec"
  cork: "#ae7950"
  gray: "#625f56"
  yellow: "#f2c84b"
  red: "#d95b49"
  teal: "#7eaa9b"
typography:
  display:
    fontFamily: "Barlow, sans-serif"
    fontSize: "clamp(36px, 6vw, 66px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-1px"
  headline:
    fontFamily: "PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "30px"
    lineHeight: 1.2
    letterSpacing: "-1px"
  body:
    fontFamily: "PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "14px"
    lineHeight: 1.6
  field:
    fontFamily: "PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "16px"
  label:
    fontFamily: "PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "11px"
rounded:
  sm: "4px"
  md: "12px"
  lg: "20px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.black}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "11px 17px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.black}"
    rounded: "{rounded.sm}"
    padding: "11px 17px"
  paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.black}"
  category-selected:
    backgroundColor: "{colors.black}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "9px 17px"
---

# Design System: OPC之路 × TONK

## Overview

**Creative North Star: "The TONK Paper Journal"**

A personal growth journal expressed as the user-pinned TONK paper world: charcoal, cream journal stock, warm cork, polaroids and small character stickers. Personal writing and photos lead; the supplied logo and mascot hold the identity. This is an operative Chinese interface with local records and explicit editing controls.

**Key Characteristics:**
- Charcoal framing with readable cream paper
- Cork, pinned polaroids and taped idea notes
- Condensed English accents and Chinese system text
- Restrained angles on decoration; upright editable controls

## Colors

The palette combines warm paper neutrals with yellow, red and muted teal accents; frontmatter records the source CSS primitives.

### Primary
- **Charcoal:** header, bottom navigation, primary actions, progress fills and monthly-review background.
- **Dream Yellow:** active navigation, statistics, hero underline and alternate pins/labels.

### Secondary
- **Sticker Teal:** focus outlines, dream labels and alternate pin heads.
- **Pin Red:** pin heads, caret and active microphone recording state.

### Neutral
- **Cream:** application canvas.
- **Paper:** writing surfaces, polaroid borders and text against charcoal.
- **Cork:** textured dream-board backing.
- **Warm Gray:** secondary body copy, history quote and explanatory labels.

Local pastel exceptions are intentional: idea notes use yellow (#f4dd89), teal (#baceb8), pink (#e8bbad) or paper; dream labels also use peach (#e5a694) and sage (#b7c6a0). Fields use off-white (#fffdf7). Journal placeholders use darker warm gray (#716a60); idea-wall headings use (#5e584d). These are local treatments rather than additional global tokens.

## Typography

Chinese body and headings use PingFang SC, Microsoft YaHei, sans-serif. The self-hosted display.ttf is registered as Barlow at weight (700), with font-display swap. It appears in English display copy, date numerals, stats and board captions. The large Chinese home title remains system sans, bold (900), with a slight skew.

Page headings are (30px), becoming (27px) at the phone breakpoint. Body is (14px) with line height (1.6); fields are (16px). Small navigation labels are (11px). The monthly English heading uses clamp(36px, 6vw, 66px), line height (1). Home display scales (62px → 54px → 43px). Idea titles scale (21px → 17px) on phones. Compact polaroid descriptions use (11px) on phones and wide desktop; do not apply that small size to editable writing.

## Layout

The application is centered within (1120px), with a warm gray outer canvas. Desktop header height is (76px); content padding is (32px 40px 120px). At max-width (600px), header becomes (64px) and content padding (24px 20px 110px). Bottom space reserves the fixed navigation.

Home entries are four columns, two at max-width (900px). Its lower pair starts at (1.25fr 1fr), becomes equal columns at (900px), and stacks at (600px). The dark hero bleeds to content edges; its polaroid remains an absolute decoration, smaller and partly offset on phones. Phone hero copy is constrained to (180px).

Dreams use two columns by default and four at min-width (1000px); they deliberately remain two on phones. Board gaps shrink from (38px 42px) to (27px 20px) on phones. Idea notes use three columns, two at (900px), and retain two at (600px). Journal uses a flexible writing column plus (270px) history, reduced to (220px) at (800px); at (600px) history stacks and loses sticky positioning. Monthly review body uses (1.2fr 1fr), stacking at (800px), while all five compact metrics remain in a row.

Navigation floats at desktop bottom (20px), width (380px), rounded (16px). At (600px) it becomes full width flush to the bottom with square corners and safe-area padding. Dialogs are bounded to min(520px, calc(100% - 24px)) and viewport height, scrolling vertically.

## Elevation & Depth

Depth is material: textured stock, cork grain, offset paper shadows and tangible pins. Paper shadow is (0 5px 15px #27251c24); elevated card/toast shadow is (0 8px 24px #17171335). Polaroids on cork have a warmer shadow (0 6px 16px #452a1c55); the hero art uses (0 10px 24px #0005). Cork includes an inset shadow. Dashed separators recall journal marks.

Motion is short and functional: entry and note transforms transition over (.18s), progress width over (.25s), microphone shadow over (.2s). Hover lifts entries and straightens pinned cards. Reduced-motion preference disables transitions, animations and smooth scrolling.

## Shapes

The source radius primitives are (4px), (12px), (20px); actual components also use (8px) for prompt/entry cards, (16px) navigation, circles for microphone/pins, and slight polygon clipping for torn notes. These local exceptions are part of the reference-led paper world. Dream angles come from stored layout rotation; idea notes alternate small angles. Fields and dialogs stay upright.

The original mascot PNG and gray background are retained inside cream polaroids; no background removal was performed. The small green monster at the cork-board bottom is a CSS viewport crop of that same PNG, with a cream border and rotation. The TONK logo is cropped from the supplied PNG via overflow and positioning; the dark-header variant uses CSS inversion and screen blending. The favicon uses the original TONK logo PNG. Paper and cork texture are CSS patterns, not replacement image assets.

## Components

**Buttons:** rectangular, slightly rounded (4px), padding (11px 17px), minimum height (44px). Primary uses charcoal/paper; secondary is transparent with dark border; danger uses red ink and a muted red border. Hover brightness is (.92); disabled opacity (.5). Keyboard focus uses a teal (3px) outline offset (4px). Icon controls also reserve (44px) hit areas.

**Fields and search:** modal fields use an off-white fill, thin warm-gray border, (4px) corners and (11px 12px) padding. Focus outline is teal (2px). Search gives the enclosing surface a focus-within outline offset (3px); its input becomes (16px) at the phone breakpoint to avoid iOS input zoom. Upload controls are dashed, labelled drop-style controls; image previews are square crops with visible remove buttons. Journal prompt cards contain transparent textareas and explicit save controls.

**Category chips and tags:** horizontally scrollable category buttons use warm neutral unselected fill and charcoal/paper selected fill. Selected categories expose pressed state. Idea tags are compact inline hashtag text, wrapping without pill backgrounds.

**Navigation:** four icon-and-text destinations: dreams, journal, ideas, review. Active uses yellow with aria-current; hover uses paper. Home is accessible from the header. Desktop and phone geometry follow Layout.

**Pinned dream cards:** image or empty-photo placeholder, colored title strip, red/yellow/teal pin, description, progress and labelled demo state. The entire polaroid opens editing. Titles clamp to two lines, descriptions four; full text remains in the editor.

**Taped idea notes:** pastel/paper rotated notes with tape, date, optional first image, heading, eight-line content excerpt and wrapping tags. Clicking opens the upright editor. Search and chronology sit above the wall.

**Journal microphone and history:** outlined charcoal circular microphone becomes red during recording and swaps to a stop icon. Unsupported/error speech states show explanatory text. History uses dashed separators, selected teal ink and two-line excerpts. No AI integration is attached.

**Review and feedback states:** monthly review uses dark framing, five metrics, paper progress/reflection and a decorative Coming Soon AI section explicitly labelled as having no API. Toasts show save/delete status and a yellow undo action; saving overlays the interface; error banners and empty states use clear textual feedback. Source extraction documents these states; functional verification is tracked separately.

## Do's and Don'ts

### Do:
- Do preserve the supplied TONK logo, mascot and reference as visual authority.
- Do keep personal writing and photos central, with demo content visibly labelled.
- Do keep editable controls upright and show teal keyboard focus.
- Do preserve the two-column mobile dream and idea boards while stacking journal and review content.

### Don't:
- Don’t replace the pinned world with a generic dashboard or generated visual comp.
- Don’t remove the original mascot background or imply an AI service exists.
- Don’t rotate form fields, hide edit actions behind decorative gestures, or present future drag metadata as an active interaction.
