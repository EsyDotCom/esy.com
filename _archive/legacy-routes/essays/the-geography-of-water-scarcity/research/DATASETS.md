# Curated Datasets: The Geography of Water Scarcity

## Dataset Registry

### Dataset 1: WRI Aqueduct Water Risk Atlas 4.0
- **Source**: World Resources Institute
- **URL**: https://www.wri.org/aqueduct
- **License**: CC BY 4.0 (open, attribution required)
- **Coverage**: Global; country and sub-basin level; historical baseline + projections to 2040
- **Resolution**: Sub-basin level (hydrological units); aggregatable to country
- **Last Updated**: 2023 (Aqueduct 4.0 release)
- **Methodology**: Model-based using hydrological models (PCR-GLOBWB) driven by climate models (CMIP6) and socioeconomic scenarios (SSP). Combines water supply (precipitation, snowmelt, upstream inflow) with water demand (agricultural, industrial, domestic withdrawals).
- **Variables Used**:
  - `bws_raw`: Baseline water stress (ratio of withdrawals to available supply, 0-5 scale)
  - `bws_cat`: Water stress category (Low, Low-Medium, Medium-High, High, Extremely High)
  - `iav_raw`: Interannual variability (seasonal stress variation)
  - `sev_raw`: Seasonal variability
  - `drr_raw`: Drought risk
  - `projected_bws_2030`: Projected baseline water stress, 2030 (multiple scenarios)
  - `projected_bws_2040`: Projected baseline water stress, 2040 (multiple scenarios)
- **Limitations**: Model resolution may miss localized variation. Projections depend on SSP scenario selection. Groundwater dynamics simplified. Small island states may be underrepresented.
- **Used In**: Choropleth Map (Visual 1), time scrubber projections

### Dataset 2: FAO AQUASTAT
- **Source**: Food and Agriculture Organization of the United Nations
- **URL**: https://www.fao.org/aquastat/
- **License**: Open (FAO data terms — free for non-commercial; commercial requires agreement)
- **Coverage**: Global; country level; time series from 1960s to present
- **Resolution**: Country level
- **Last Updated**: Continuously updated (most recent country data varies, typically 2015-2022)
- **Methodology**: National reporting + FAO estimation. Countries report water withdrawal data to FAO. Gaps filled with model estimates. Data quality varies by country.
- **Variables Used**:
  - `total_withdrawal_km3`: Total freshwater withdrawal (km³/year)
  - `agricultural_withdrawal_pct`: Agricultural withdrawal as % of total
  - `industrial_withdrawal_pct`: Industrial withdrawal as % of total
  - `municipal_withdrawal_pct`: Municipal/domestic withdrawal as % of total
  - `renewable_freshwater_per_capita`: Total renewable freshwater per capita (m³/year)
  - `agricultural_subcategories`: Irrigation, livestock, aquaculture breakdown (where available)
- **Limitations**: Country self-reporting introduces inconsistency. Data years vary across countries (not all from same year). Agricultural subcategories (irrigation vs. livestock) not available for all countries. Informal/unreported withdrawals underestimated.
- **Used In**: Sankey/Flow Diagram (Visual 2), Country Comparison (Visual 3), Data Ticker

### Dataset 3: WHO/UNICEF Joint Monitoring Programme (JMP)
- **Source**: World Health Organization / UNICEF
- **URL**: https://washdata.org/
- **License**: Open (CC BY-NC-SA for reports; data API is public)
- **Coverage**: Global; country level; time series 2000-present
- **Resolution**: Country level, with some sub-national estimates
- **Last Updated**: 2023 (Progress on WASH report)
- **Methodology**: National household surveys, censuses, and administrative data. Harmonized by JMP for cross-country comparability.
- **Variables Used**:
  - `safely_managed_drinking_water_pct`: Population with safely managed drinking water (%)
  - `basic_drinking_water_pct`: Population with at least basic drinking water (%)
  - `population_lacking_basic_water`: Absolute number without basic water service
- **Limitations**: "Safely managed" definition is stricter than "basic" — percentages vary significantly by metric. Sub-national inequality not fully captured at country level.
- **Used In**: Data Ticker (population statistics), prose context

### Dataset 4: World Bank Open Data
- **Source**: World Bank
- **URL**: https://data.worldbank.org/
- **License**: CC BY 4.0
- **Coverage**: Global; country level; time series
- **Resolution**: Country level
- **Last Updated**: Continuously updated
- **Methodology**: National statistics offices, cross-validated by World Bank economists
- **Variables Used**:
  - `renewable_internal_freshwater_per_capita`: Renewable internal freshwater resources per capita (m³)
  - `water_productivity_gdp_per_m3`: Water productivity (GDP per m³ of freshwater withdrawal)
  - `annual_freshwater_withdrawals_pct`: Annual freshwater withdrawals as % of internal resources
  - `gdp_per_capita`: GDP per capita (for normalization)
  - `population`: Total population (for per-capita calculations)
  - `agriculture_pct_gdp`: Agriculture value added as % of GDP
- **Limitations**: Some indicators have significant data gaps for smaller countries. Water productivity metric can be misleading for service-economy countries.
- **Used In**: Country Comparison (Visual 3), normalization

### Dataset 5: National Water Agency Data (Curated)
- **Source**: Multiple national agencies
- **URLs**:
  - Israel Water Authority: https://www.gov.il/en/departments/iwa
  - PUB Singapore: https://www.pub.gov.sg/
  - Bureau of Meteorology Australia: http://www.bom.gov.au/
- **License**: Varies by agency (generally open for educational/non-commercial use)
- **Coverage**: Country-specific; varies
- **Resolution**: National, sometimes regional
- **Last Updated**: Varies (2020-2024)
- **Methodology**: National measurement networks, official reporting
- **Variables Used**:
  - Israel: `wastewater_recycling_rate`, `desalination_capacity`, `agricultural_water_efficiency`
  - Singapore: `imported_water_pct`, `newater_capacity`, `reservoir_capacity`
  - Australia: `water_restrictions_data`, `desalination_capacity`, `recycling_rates`
- **Limitations**: Different countries report different metrics with different methodologies. Direct comparison requires careful normalization and caveats.
- **Used In**: Country Comparison (Visual 3)

---

## Cross-Dataset Compatibility

| Dataset A | Dataset B | Compatible? | Normalization Required |
|-----------|-----------|-------------|----------------------|
| WRI Aqueduct | FAO AQUASTAT | ⚠️ Partial | WRI uses sub-basin; FAO uses country. Aggregate WRI to country level for comparison. Stress categories may differ slightly. |
| FAO AQUASTAT | World Bank | ✅ Yes | Both use country-level data. Some World Bank water indicators are sourced FROM FAO. |
| WRI Aqueduct | WHO/UNICEF JMP | ⚠️ Partial | Different metrics (stress vs. access). Can correlate but not directly merge. |
| National agencies | World Bank | ⚠️ Partial | National data may be more recent/detailed than World Bank aggregates. Cross-reference for consistency. |

---

## Data Freshness

| Dataset | Latest Year | Acceptable for 2026 Publication? |
|---------|-------------|----------------------------------|
| WRI Aqueduct 4.0 | 2023 release (data through 2019 + projections) | ✅ Yes — industry standard |
| FAO AQUASTAT | 2015-2022 (varies by country) | ✅ Yes — structural patterns stable |
| WHO/UNICEF JMP | 2023 | ✅ Yes |
| World Bank | 2022-2024 (varies) | ✅ Yes |
| National agencies | 2020-2024 | ✅ Yes |

---

## Data Embedding Strategy

For the single .jsx file architecture, all data must be embedded. Strategy:

1. **Choropleth Map**: Embed simplified TopoJSON (world boundaries) + country-level stress values as JSON arrays for each time step (2000, 2010, 2020, 2030, 2040)
2. **Sankey Diagram**: Embed static allocation percentages as constants (global aggregate)
3. **Country Comparison**: Embed curated metrics for 6-8 countries as a structured object
4. **Scroll-Lock Explainer**: Embed stage data as array of objects (no external data needed)
5. **Data Ticker**: Embed 4-6 key statistics as constants

**Total embedded data estimate**: ~50-100KB JSON (acceptable for single-file architecture)
