# Genomic Mutation Tracking and Analysis Platform

A comprehensive bioinformatics platform for cataloging, analyzing, and visualizing genetic mutations across organisms. The platform integrates multiple genomic databases and provides real-time sequence context analysis for mutation research, clinical genomics, and comparative studies.

## Core Analytical Features

### Genomic Context Visualization
- **Real-time sequence retrieval**: Fetches genomic sequences around mutation sites using the Ensembl REST API
- **Color-coded nucleotide display**: Visual representation of DNA sequences with mutation highlighting
- **Flanking sequence analysis**: Displays ±20 base pairs around each mutation for context analysis
- **Strand-aware positioning**: Correctly handles mutations on both forward and reverse strands

### Gene-Centric Analysis
- **Gene metadata integration**: Automatically retrieves gene information from MyGene.info database
- **Chromosomal mapping**: Provides precise genomic coordinates and chromosomal locations
- **Gene schematic visualization**: Interactive gene maps showing mutation positions relative to gene structure
- **External database linking**: Direct links to UniProt, Ensembl, and other genomic resources

### Mutation Classification and Analytics
- **Mutation type distribution**: Statistical analysis of mutation types across datasets
- **Temporal tracking**: Timeline visualization of mutation discovery and reporting patterns
- **Bulk data handling**: CSV import/export functionality for large-scale mutation datasets
- **Cross-species comparative analysis**: Tracks mutations across different organisms

## External Database Integration and APIs

GeneTrackr integrates with multiple genomic databases and APIs to provide comprehensive mutation analysis capabilities:

### Ensembl REST API
- **Purpose**: Real-time genomic sequence retrieval and genome annotation
- **Endpoints**: 
  - `https://rest.ensembl.org/sequence/region/human/` - DNA sequence retrieval
  - `https://rest.ensembl.org/lookup/symbol/human/` - Gene coordinate lookup
- **Functionality**: Fetches DNA sequences around mutation sites, provides gene structural information
- **Data Types**: Genomic sequences, gene coordinates, transcript information
- **Documentation**: https://rest.ensembl.org/

### MyGene.info API
- **Purpose**: Comprehensive gene metadata and functional annotation
- **Endpoint**: `https://mygene.info/v3/query`
- **Functionality**: Gene symbol resolution, chromosomal mapping, functional summaries, cross-references
- **Data Types**: Gene names, chromosomal locations, functional descriptions, external database IDs
- **Documentation**: https://docs.mygene.info/

### UniProt Database Integration
- **Purpose**: Protein-level information and functional domain analysis
- **Access Method**: Direct linking to UniProt entries via gene-protein mappings
- **Functionality**: Protein sequence analysis, structural domains, post-translational modifications
- **Data Types**: Protein sequences, functional domains, pathways, disease associations
- **Website**: https://www.uniprot.org/

### Additional Database Connections
- **NCBI Gene Database**: Accessible through MyGene.info API integration for comprehensive gene information
- **Ensembl Genome Browser**: Direct linking for detailed genomic visualization and annotation
- **External Variant Databases**: Compatible with VCF and other standard genomic data formats

## Data Management and Export Capabilities

### Supported Data Formats
- **CSV Import/Export**: Standard comma-separated format for spreadsheet compatibility
- **Bulk Import**: Large-scale mutation dataset processing
- **Real-time Export**: Dynamic data extraction for downstream analysis
- **Cross-platform Compatibility**: Compatible with R, Python, MATLAB, and other analysis environments

### Data Structure
The platform organizes mutation data with comprehensive metadata including:
- Gene symbols and organism specifications
- Mutation classifications and detailed descriptions
- Genomic coordinates and positional information
- Temporal tracking and data provenance
- External database cross-references

## Licensing and Availability

This bioinformatics platform is released under the Creative Commons CC0 1.0 Universal license.

---
