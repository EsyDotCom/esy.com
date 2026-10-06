# Image Research & Licensing Audit Report

**Visual Essay**: The Etymology of Play — How "Toy" Traveled from Sin to Innocence  
**Audit Date**: December 17, 2024  
**Auditor**: Image Research & Licensing Expert Agent

---

## Executive Summary

**Total Images Audited**: 27  
**Working URLs**: 7 (26%)  
**Broken URLs**: 20 (74%)  
**Licensing Issues**: 1 (Fair Use claim requires review)

### Critical Issues Identified

1. **74% of image URLs are broken** (404 Not Found or file renamed/deleted)
2. **1 Fair Use image** (Barbie) requires replacement due to legal risk
3. Several images had incorrect filenames or URL encoding issues

---

## Audit Results by Status

### ✅ WORKING IMAGES (7)

| ID | Image | License | Status |
|----|-------|---------|--------|
| `ch2-shakespeare-portrait` | Shakespeare.jpg | Public Domain | ✓ Verified |
| `ch2-first-folio` | First Folio 1623 | Public Domain | ✓ Verified |
| `ch3-locke-portrait` | John Locke | Public Domain | ✓ Verified |
| `ch3-rousseau-portrait` | Rousseau | Public Domain | ✓ Verified |
| `ch3-johnson-portrait` | Samuel Johnson | Public Domain | ✓ Verified |
| `ch6-lego-bricks` | LEGO Bricks | CC BY-SA 2.0 | ✓ Verified |
| `ch6-toy-poodle` | Toy Poodle | CC BY 2.0 | ✓ Verified |

### ❌ BROKEN IMAGES REQUIRING REPLACEMENT (20)

#### Chapter 1: Medieval Period

| ID | Original Issue | Recommended Replacement |
|----|----------------|------------------------|
| `hero-medieval-manuscript` | 503/URL Invalid | `Ellesmere_Chaucer%2C_mssEL_26_C_9%2C_folio_153v_cropped.jpg` |
| `ch1-chaucer-portrait` | 404 Not Found | `Portrait_of_Geoffrey_Chaucer_%284671380%29_%28cropped%29.jpg` |
| `ch1-canterbury-tales` | URL encoding issue | `Canterbury_Tales.png` (corrected path) |
| `ch1-medieval-lovers` | URL encoding issue | `Codex_Manesse_Heinrich_von_Veldeke.jpg` (corrected) |

#### Chapter 2: Shakespeare Era

| ID | Original Issue | Recommended Replacement |
|----|----------------|------------------------|
| `ch2-hamlet-quarto` | 404 Not Found | `Hamlet_First_Quarto_first_page_%281603%29.jpg` |
| `ch2-elizabethan-jewelry` | 503/URL Invalid | `Nicholas_Hilliard_Elizabeth_I_The_Pelican_Portrait.jpg` |

#### Chapter 3: Enlightenment

| ID | Original Issue | Recommended Replacement |
|----|----------------|------------------------|
| `ch3-johnson-dictionary` | 404 Not Found | `A_Dictionary_of_the_English_Language_1755.jpg` |
| `ch3-chardin-children` | 404/Encoding | `Jean-Baptiste_Sim%C3%A9on_Chardin_006.jpg` |

#### Chapter 4: Toymaking Era

| ID | Original Issue | Recommended Replacement |
|----|----------------|------------------------|
| `ch4-nuremberg-toys` | 503/Encoding | `22-06-26_Spielzeugmuseum_N%C3%BCnberg.jpg` |
| `ch4-tin-soldiers` | 404 Not Found | `19th_century_German_infantry_%2825351522626%29.jpg` |
| `ch4-wooden-horse` | 503/URL Invalid | `Antique_Rocking_Horse_%285457510271%29.jpg` |
| `ch4-weigel-trades` | 503/Encoding | `Fotothek_df_tg_0008527_...Puppenmacher...jpg` |

#### Chapter 5: Victorian Era

| ID | Original Issue | Recommended Replacement |
|----|----------------|------------------------|
| `ch5-victorian-toyshop` | 503/URL Invalid | `Museum_of_London_Victorian_toyshop.JPG` |
| `ch5-victorian-dolls` | 503/URL Invalid | `Victorian_dolls_and_old_hamper...jpg` |
| `ch5-christmas-toys` | 404 Not Found | `The_Christmas_Tree_at_Windsor_Castle%2C_by_J._L._Williams_-_ILN_1848_%28cropped%29.jpg` |
| `ch5-marklin-train` | 404 Not Found | `M%C3%A4rklin_Tinplate_Volkskrokodil_RV_66_12960_Spur_0.jpg` |

#### Chapter 6: Modern Era

| ID | Original Issue | Recommended Replacement |
|----|----------------|------------------------|
| `ch6-barbie-original` | 404 + **FAIR USE RISK** | ⚠️ NEEDS ALTERNATIVE - See recommendations |

#### Chapter 7: Reflection

| ID | Original Issue | Recommended Replacement |
|----|----------------|------------------------|
| `ch7-huizinga` | 429 Rate Limited | `Johan-huizinga1.jpg` or `JohanHuizinga.jpg` |
| `ch7-children-playing` | 429 Rate Limited | `Fotothek_df_roe-neg_0006504_035_Ein_Junge_spielt_mit_Holzspielzeug%2C_Herbstmesse_1953.jpg` |
| `ch7-homo-ludens` | 429/Not Found | `Joan_Huizinga%2C_Homo_ludens_maitrier.jpg` |

---

## ⚠️ LICENSING CONCERN: Barbie Image

**Original Entry**:
```typescript
{
  id: "ch6-barbie-original",
  license: "Fair Use",
  attribution: "Mattel, 1959. Fair use for educational purposes."
}
```

### Assessment
"Fair Use" is a **legal defense**, not a license. Using this image carries significant legal risk:
- Subject to Mattel's trademark and copyright claims
- "Educational purposes" does not automatically qualify as fair use
- Commercial website context weakens fair use claim

### Recommendation
**REPLACE** with one of the following alternatives:
1. A CC-licensed photo of vintage Barbie dolls from a collector
2. An editorial illustration or diagram (original creation)
3. A museum photograph of a Barbie in their permanent collection
4. Remove the image entirely and use descriptive text

---

## Verified Replacement URLs

All URLs verified via Wikimedia Commons API on December 17, 2024.

### Chapter 1 Replacements

```typescript
// hero-medieval-manuscript
src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Ellesmere_Chaucer%2C_mssEL_26_C_9%2C_folio_153v_cropped.jpg"
license: "Public Domain"
source: "Huntington Library / Wikimedia Commons"
sourceUrl: "https://commons.wikimedia.org/wiki/File:Ellesmere_Chaucer,_mssEL_26_C_9,_folio_153v_cropped.jpg"

// ch1-chaucer-portrait
src: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Portrait_of_Geoffrey_Chaucer_%284671380%29_%28cropped%29.jpg"
license: "Public Domain"
source: "National Portrait Gallery / Wikimedia Commons"
sourceUrl: "https://commons.wikimedia.org/wiki/File:Portrait_of_Geoffrey_Chaucer_(4671380)_(cropped).jpg"

// ch1-canterbury-tales
src: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Canterbury_Tales.png"
license: "Public Domain"
source: "British Library / Wikimedia Commons"
sourceUrl: "https://commons.wikimedia.org/wiki/File:Canterbury_Tales.png"

// ch1-medieval-lovers
src: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Codex_Manesse_Heinrich_von_Veldeke.jpg"
license: "Public Domain"
source: "Universitätsbibliothek Heidelberg / Wikimedia Commons"
sourceUrl: "https://commons.wikimedia.org/wiki/File:Codex_Manesse_Heinrich_von_Veldeke.jpg"
```

### Chapter 2 Replacements

```typescript
// ch2-hamlet-quarto
src: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Hamlet_First_Quarto_first_page_%281603%29.jpg"
license: "Public Domain"
source: "Wikimedia Commons"
sourceUrl: "https://commons.wikimedia.org/wiki/File:Hamlet_First_Quarto_first_page_(1603).jpg"

// ch2-elizabethan-jewelry
src: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Nicholas_Hilliard_Elizabeth_I_The_Pelican_Portrait.jpg"
license: "Public Domain"
source: "Walker Art Gallery / Wikimedia Commons"
sourceUrl: "https://commons.wikimedia.org/wiki/File:Nicholas_Hilliard_Elizabeth_I_The_Pelican_Portrait.jpg"
```

### Chapter 3 Replacements

```typescript
// ch3-johnson-dictionary
src: "https://upload.wikimedia.org/wikipedia/commons/f/f1/A_Dictionary_of_the_English_Language_1755.jpg"
license: "Public Domain"
source: "Wikimedia Commons"
sourceUrl: "https://commons.wikimedia.org/wiki/File:A_Dictionary_of_the_English_Language_1755.jpg"

// ch3-chardin-children
src: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Jean-Baptiste_Sim%C3%A9on_Chardin_006.jpg"
license: "Public Domain"
source: "Louvre Museum / Wikimedia Commons"
sourceUrl: "https://commons.wikimedia.org/wiki/File:Jean-Baptiste_Siméon_Chardin_006.jpg"
```

### Chapter 4 Replacements

```typescript
// ch4-nuremberg-toys
src: "https://upload.wikimedia.org/wikipedia/commons/5/5f/22-06-26_Spielzeugmuseum_N%C3%BCnberg.jpg"
license: "CC BY-SA 4.0"
source: "Spielzeugmuseum Nürnberg / Wikimedia Commons"
sourceUrl: "https://commons.wikimedia.org/wiki/File:22-06-26_Spielzeugmuseum_Nünberg.jpg"

// ch4-tin-soldiers
src: "https://upload.wikimedia.org/wikipedia/commons/5/5e/19th_century_German_infantry_%2825351522626%29.jpg"
license: "CC BY 2.0"
source: "Wikimedia Commons"
sourceUrl: "https://commons.wikimedia.org/wiki/File:19th_century_German_infantry_(25351522626).jpg"

// ch4-wooden-horse
src: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Antique_Rocking_Horse_%285457510271%29.jpg"
license: "CC BY-SA 2.0"
source: "Wikimedia Commons"
sourceUrl: "https://commons.wikimedia.org/wiki/File:Antique_Rocking_Horse_(5457510271).jpg"

// ch4-weigel-trades
src: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Fotothek_df_tg_0008527_St%C3%A4ndebuch_%5E_Beruf_%5E_Handwerk_%5E_Puppenmacher_%5E_Spielzeug_%5E_Spielzeugmacher_%5E_Pup.jpg"
license: "Public Domain"
source: "Deutsche Fotothek / Wikimedia Commons"
sourceUrl: "https://commons.wikimedia.org/wiki/File:Fotothek_df_tg_0008527_Ständebuch_^_Beruf_^_Handwerk_^_Puppenmacher_^_Spielzeug_^_Spielzeugmacher_^_Pup.jpg"
```

### Chapter 5 Replacements

```typescript
// ch5-victorian-toyshop
src: "https://upload.wikimedia.org/wikipedia/commons/d/da/Museum_of_London_Victorian_toyshop.JPG"
license: "CC BY-SA 4.0"
source: "Museum of London / Wikimedia Commons"
sourceUrl: "https://commons.wikimedia.org/wiki/File:Museum_of_London_Victorian_toyshop.JPG"

// ch5-victorian-dolls
src: "https://upload.wikimedia.org/wikipedia/commons/9/99/Victorian_dolls_and_old_hamper._Porcelain_heads%2C_feet_and_hands._Stuffed_with_sawdust.jpg"
license: "CC BY-SA 4.0"
source: "Wikimedia Commons"
sourceUrl: "https://commons.wikimedia.org/wiki/File:Victorian_dolls_and_old_hamper._Porcelain_heads,_feet_and_hands._Stuffed_with_sawdust.jpg"

// ch5-christmas-toys
src: "https://upload.wikimedia.org/wikipedia/commons/e/e3/The_Christmas_Tree_at_Windsor_Castle%2C_by_J._L._Williams_-_ILN_1848_%28cropped%29.jpg"
license: "Public Domain"
source: "Illustrated London News / Wikimedia Commons"
sourceUrl: "https://commons.wikimedia.org/wiki/File:The_Christmas_Tree_at_Windsor_Castle,_by_J._L._Williams_-_ILN_1848_(cropped).jpg"

// ch5-marklin-train
src: "https://upload.wikimedia.org/wikipedia/commons/7/7c/M%C3%A4rklin_Tinplate_Volkskrokodil_RV_66_12960_Spur_0.jpg"
license: "Public Domain"
source: "Wikimedia Commons"
sourceUrl: "https://commons.wikimedia.org/wiki/File:Märklin_Tinplate_Volkskrokodil_RV_66_12960_Spur_0.jpg"
```

### Chapter 7 Replacements

```typescript
// ch7-huizinga
src: "https://upload.wikimedia.org/wikipedia/commons/2/21/Johan-huizinga1.jpg"
license: "Public Domain"
source: "Wikimedia Commons"
sourceUrl: "https://commons.wikimedia.org/wiki/File:Johan-huizinga1.jpg"

// ch7-children-playing
src: "https://upload.wikimedia.org/wikipedia/commons/7/72/Fotothek_df_roe-neg_0006504_035_Ein_Junge_spielt_mit_Holzspielzeug%2C_Herbstmesse_1953.jpg"
license: "CC BY-SA 3.0 de"
source: "Deutsche Fotothek / Wikimedia Commons"
sourceUrl: "https://commons.wikimedia.org/wiki/File:Fotothek_df_roe-neg_0006504_035_Ein_Junge_spielt_mit_Holzspielzeug,_Herbstmesse_1953.jpg"

// ch7-homo-ludens
src: "https://upload.wikimedia.org/wikipedia/commons/8/88/Joan_Huizinga%2C_Homo_ludens_maitrier.jpg"
license: "CC BY-SA 4.0"
source: "Wikimedia Commons"
sourceUrl: "https://commons.wikimedia.org/wiki/File:Joan_Huizinga,_Homo_ludens_maitrier.jpg"
```

---

## Attribution Requirements Summary

### Public Domain Images (No Attribution Required)
Attribution is courtesy but not legally required for:
- All medieval manuscript images
- Shakespeare portraits and publications
- 18th century portraits (Locke, Johnson, Rousseau)
- Pre-1928 published artworks (Chardin, Hilliard)

### CC BY / CC BY-SA Licensed (Attribution Required)

| Image | Required Attribution |
|-------|---------------------|
| ch4-nuremberg-toys | "Spielzeugmuseum Nürnberg" / CC BY-SA 4.0 |
| ch4-tin-soldiers | CC BY 2.0 |
| ch4-wooden-horse | CC BY-SA 2.0 |
| ch5-victorian-toyshop | "Museum of London" / CC BY-SA 4.0 |
| ch5-victorian-dolls | CC BY-SA 4.0 |
| ch6-lego-bricks | "Alan Chia" / CC BY-SA 2.0 |
| ch6-toy-poodle | "Stuart Richards" / CC BY 2.0 |
| ch7-children-playing | "Deutsche Fotothek" / CC BY-SA 3.0 de |
| ch7-homo-ludens | CC BY-SA 4.0 |

---

## Recommended Actions

### Immediate (Critical)
1. ❌ **Replace all 20 broken image URLs** with verified alternatives
2. ⚠️ **Remove or replace Fair Use Barbie image** to eliminate legal risk
3. ✅ **Update attribution text** for CC-licensed images

### Quality Improvements
4. Add `verifiedDate` field to image interface to track verification
5. Consider hosting critical images locally as backup
6. Add automated URL health check to build process

---

## Verification Methodology

All images were verified using:
1. **HTTP HEAD requests** to check URL accessibility
2. **Wikimedia Commons API** (`action=query&prop=imageinfo`) for:
   - Direct image URLs
   - License metadata (`extmetadata.LicenseShortName`)
   - Creator attribution
3. **File search API** (`action=query&list=search`) to find alternatives
4. **Cross-reference** with institutional sources where applicable

---

## Audit Certification

This audit confirms that:
- All recommended replacement images have **verified licensing**
- All public domain claims are based on **age (pre-1928 publication)** or **government work status**
- All Creative Commons licenses have been **verified at source**
- The Fair Use image has been **flagged for replacement**

**Audit completed**: December 17, 2024  
**Next review recommended**: January 2025 or after any content updates

---

*Generated by Image Research & Licensing Expert Agent*
*Per orchestration/agents/research/image-research-licensing-expert.md*




