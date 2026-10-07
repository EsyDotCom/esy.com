# Projections & Future Data: The Geography of Water Scarcity

## ⚠️ Projection Disclaimer

All data in this file represents **model-based projections**, not measured observations. Projections must be:
1. Clearly labeled as projections in all visualizations
2. Attributed to specific models and institutions
3. Presented with confidence intervals where available
4. Distinguished visually from historical/measured data (e.g., solid line → dashed line at boundary year)

---

## Projection Registry

### Projection 1: "Global water demand will exceed supply by ~40% by 2030"
- **Projected Value**: ~40% gap (range: 30-50%)
- **Target Year**: 2030
- **Baseline Year**: 2009 (study publication)
- **Model/Source**: 2030 Water Resources Group (WRG), "Charting Our Water Future" (2009)
- **Source Tier**: Tier 2 (industry-academic consortium; widely cited by World Bank, OECD, UN)
- **Scenario**: Business-as-usual (BAU) — no major policy changes, current population/GDP/climate trajectories
- **Confidence Interval**: Not formally stated; range of 30-50% across different model runs
- **Key Assumptions**: Population growth follows UN medium variant, agricultural demand grows with food demand, no breakthrough technology deployment, climate change follows moderate warming scenario
- **Limitations**: Original study from 2009 — some conditions have changed (improved efficiency in some sectors, worse climate trajectory). The 40% figure is directionally correct but should be treated as order-of-magnitude, not precise.
- **Used In**: Data Ticker (Visual 5), Section 4 prose

### Projection 2: "Water stress will intensify across South Asia, MENA, and sub-Saharan Africa by 2040"
- **Projected Value**: Increase of 1-2 stress categories in affected regions
- **Target Year**: 2040
- **Baseline Year**: 2019 (Aqueduct 4.0 baseline)
- **Model/Source**: WRI Aqueduct 4.0 (using CMIP6 climate models + SSP socioeconomic scenarios)
- **Source Tier**: Tier 1 (peer-reviewed methodology, Tier 1 institution)
- **Scenario**: SSP2-RCP4.5 (middle-of-the-road socioeconomic + moderate emissions) and SSP3-RCP8.5 (high inequality + high emissions)
- **Confidence Interval**: Multi-model ensemble; ranges provided for each scenario
- **Key Assumptions**: Climate models project precipitation changes, temperature increases affect evapotranspiration, population follows SSP trajectories, water use efficiency follows historical trends
- **Limitations**: Sub-national variation lost at country resolution. Small island states underrepresented. Groundwater dynamics simplified. Local adaptation measures not modeled.
- **Used In**: Choropleth Map time scrubber (Visual 1) — 2030 and 2040 time steps

### Projection 3: "4.8–5.7 billion people could face water scarcity at least one month per year by 2050"
- **Projected Value**: 4.8–5.7 billion people
- **Target Year**: 2050
- **Baseline Year**: 2010 (Burek et al. baseline)
- **Model/Source**: Burek et al. (2016), IIASA; cited in IPCC AR6 WGII Ch4
- **Source Tier**: Tier 1 (IIASA modeling + IPCC citation)
- **Scenario**: Multiple scenarios; range reflects SSP1 (sustainability) to SSP3 (regional rivalry)
- **Confidence Interval**: 4.8B (optimistic) to 5.7B (pessimistic)
- **Key Assumptions**: Monthly water stress calculated, population growth follows SSP variants, climate follows RCP scenarios
- **Limitations**: "At least one month per year" is a broader definition of scarcity — more inclusive than annual stress measures. Not directly comparable to the "2.3 billion in stressed countries" annual figure.
- **Used In**: Section 4 prose (trajectory — showing worsening trend)

### Projection 4: "India's groundwater crisis — 21 major cities could face severe depletion"
- **Projected Value**: 21 cities facing near-zero groundwater
- **Target Year**: 2030 (original), reassessed as 2030-2040 window
- **Baseline Year**: 2018
- **Model/Source**: NITI Aayog, "Composite Water Management Index" (2018)
- **Source Tier**: Tier 1 (Indian government think tank)
- **Scenario**: Business-as-usual extraction rates
- **Confidence Interval**: Not formally stated; qualitative assessment
- **Key Assumptions**: Current extraction rates continue, no significant policy intervention, no major new supply infrastructure
- **Limitations**: Some predictions in the 2018 report were overly aggressive (e.g., "zero groundwater by 2020" for some cities). The timeline has proven optimistic (crisis is real but slower than predicted). Use as directional warning, not precise timeline.
- **Used In**: Section 4 prose (India as case study for invisible scarcity)

### Projection 5: "Climate change could reduce renewable surface water and groundwater by 20% for each degree of warming"
- **Projected Value**: ~20% reduction per °C (in already-dry regions)
- **Target Year**: Continuous (scaled to warming scenarios)
- **Baseline Year**: Pre-industrial
- **Model/Source**: IPCC AR6 WGII, Chapter 4 (Water)
- **Source Tier**: Tier 1 (IPCC — gold standard for climate projections)
- **Scenario**: Multiple warming scenarios (1.5°C, 2°C, 3°C)
- **Confidence Interval**: High confidence for direction; medium confidence for magnitude
- **Key Assumptions**: Based on multi-model ensemble. The 20% figure applies primarily to subtropical dry regions and Mediterranean climate zones.
- **Limitations**: Not uniform globally — some regions may see INCREASED precipitation (high latitudes). The 20%/°C is a regional rule of thumb, not a universal constant.
- **Used In**: Section 4 (Scarcity Equation — climate as accelerant layer)

---

## Historical vs. Projected Data Boundaries

| Dataset | Historical Range | Projection Range | Boundary Year | Visual Treatment |
|---------|-----------------|------------------|---------------|-----------------|
| WRI Aqueduct stress | 2000–2019 | 2020–2040 | 2019/2020 | Solid fill → semi-transparent fill on choropleth; label reads "projected" |
| Demand-supply gap | — | 2009–2030 | N/A (all projected) | Show as range bar, not single line; include uncertainty band |
| Population in stress | 2000–2023 | 2023–2050 | 2023 | Solid line → dashed line in any time series; annotation at boundary |

---

## Scenario Comparison

| Metric | Current (2023) | BAU 2030 | Optimistic 2030 | Pessimistic 2030 | Source |
|--------|----------------|----------|-----------------|-------------------|--------|
| Population in water stress | ~2.3B | ~2.8-3.0B | ~2.5B | ~3.5B | UN, WRI |
| Demand-supply gap | ~20% | ~40% | ~15% (with investment) | ~50% | WRG, OECD |
| Countries in extreme stress | ~17 | ~22-25 | ~19 | ~30+ | WRI Aqueduct |
| Global avg water stress ratio | ~25% | ~30-35% | ~27% | ~40% | WRI, FAO |

---

## Projection Quality Assessment

| Projection | Model Track Record | Peer-Reviewed? | Multiple Models Agree? | Confidence |
|------------|-------------------|----------------|----------------------|------------|
| 40% gap by 2030 | Mixed (2009 study, some assumptions outdated) | ✅ (cited in IPCC, OECD) | ✅ Direction consistent | Medium |
| WRI Aqueduct 2040 | Good (Aqueduct has track record since v1.0) | ✅ (CMIP6, peer-reviewed methodology) | ✅ Multi-model ensemble | High |
| 4.8-5.7B in scarcity by 2050 | Good (IIASA models widely validated) | ✅ (IPCC-cited) | ✅ Range from multiple SSPs | High |
| India groundwater crisis | Mixed (some specific predictions overly aggressive) | ⚠️ (government report, not peer-reviewed) | ⚠️ (single model) | Medium |
| 20% reduction per °C | Good (IPCC synthesis of many studies) | ✅ (IPCC AR6) | ✅ Multi-model consensus | High (for direction) / Medium (for magnitude) |

---

## Choropleth Map Time Steps

For the interactive time scrubber (Visual 1), the following time steps should be rendered:

| Time Step | Data Type | Source | Treatment |
|-----------|-----------|--------|-----------|
| 2000 | Historical | WRI Aqueduct | Solid colors, "Historical" label |
| 2010 | Historical | WRI Aqueduct | Solid colors |
| 2020 | Historical (most recent measured) | WRI Aqueduct | Solid colors, "Current" label |
| 2030 | Projected (SSP2-RCP4.5) | WRI Aqueduct | Semi-transparent, "Projected" label |
| 2040 | Projected (SSP2-RCP4.5) | WRI Aqueduct | Semi-transparent, "Projected" label |

**Visual distinction**: Projected years must use a visual treatment (reduced opacity, dashed borders, or explicit "PROJECTED" watermark) that makes it impossible for the reader to mistake projections for measurements.
