# GeneTrackr: Genomic Mutation Tracking and Analysis Platform

GeneTrackr is a comprehensive bioinformatics web application designed for researchers and clinicians to catalog, analyze, and visualize genetic mutations across various organisms. The platform integrates multiple genomic databases and provides real-time sequence context analysis, making it an essential tool for mutation research, clinical genomics, and educational purposes in molecular biology.

## Introduction and Biological Context

Genetic mutations are fundamental drivers of evolution, disease, and phenotypic variation. Understanding their location, type, and context within genes is crucial for:

- **Clinical genomics**: Interpreting variants of unknown significance (VUS) in patient samples
- **Cancer research**: Tracking somatic mutations in tumor samples
- **Population genetics**: Cataloging polymorphisms across different populations  
- **Evolutionary biology**: Studying mutation patterns and selection pressures
- **Pharmacogenomics**: Understanding how genetic variants affect drug response
- **Genetic counseling**: Providing context for inherited variants

GeneTrackr addresses the need for a centralized, user-friendly platform that combines mutation cataloging with real-time genomic context visualization.

## Key Biological Features

### 🧬 Genomic Context Visualization
- **Real-time sequence retrieval**: Fetches genomic sequences around mutation sites using the Ensembl REST API
- **Color-coded nucleotide display**: Visual representation of DNA sequences with mutation highlighting
- **Flanking sequence analysis**: Displays ±20 base pairs around each mutation for context analysis
- **Strand-aware positioning**: Correctly handles mutations on both forward and reverse strands

### 🎯 Gene-Centric Analysis
- **Gene metadata integration**: Automatically retrieves gene information from MyGene.info database
- **Chromosomal mapping**: Provides precise genomic coordinates and chromosomal locations
- **Gene schematic visualization**: Interactive gene maps showing mutation positions relative to gene structure
- **External database linking**: Direct links to UniProt, Ensembl, and other genomic resources

### 📊 Mutation Classification and Analytics
- **Mutation type distribution**: Statistical analysis of mutation types across your dataset
- **Temporal tracking**: Timeline visualization of when mutations were discovered or reported
- **Bulk data handling**: CSV import/export functionality for large-scale mutation datasets
- **Cross-species support**: Tracks mutations across different organisms

## Academic and Research Use Cases

### 1. **Clinical Variant Interpretation**
Researchers can input patient variants and immediately view:
- Genomic context around the mutation site
- Gene function and disease associations
- Similar mutations in the database
- Export capabilities for clinical reports

### 2. **Cancer Genomics Research**
- Catalog somatic mutations from tumor sequencing
- Track mutation frequencies across cancer types
- Analyze hotspot regions in oncogenes/tumor suppressors
- Generate publication-ready mutation summaries

### 3. **Population Genetics Studies**
- Maintain databases of population-specific variants
- Track allele frequencies across different ethnic groups
- Study mutation patterns in specific genomic regions
- Export data for statistical analysis tools

### 4. **Educational Applications**
- Demonstrate mutation effects in molecular biology courses
- Create interactive examples for genetics education
- Visualize concepts like DNA repair, mutagenesis, and selection
- Provide hands-on experience with genomic databases

### 5. **Evolutionary Biology Research**
- Track mutations across species and time points
- Analyze selection pressures on specific genes
- Study mutation rate variations across genomic regions
- Compare orthologous sequences across species

## Installation and Setup

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn** package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/samvictordr/gene-mut-tracker.git
   cd gene-mut-tracker
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   
   # Create environment file
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

3. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   ```

4. **Start MongoDB**
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Ubuntu/Debian
   sudo systemctl start mongod
   
   # Or use Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

5. **Launch the application**
   ```bash
   # Terminal 1: Start backend server
   cd backend
   npm run dev
   
   # Terminal 2: Start frontend development server
   cd client
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Environment Configuration

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=mongodb://localhost:27017/genetrackr
PORT=5000
```

For production deployments, update the MongoDB URI to point to your production database.

## Usage Guide

### Adding Mutations

1. Navigate to "Add Mutation" in the interface
2. Fill in the required fields:
   - **Gene Symbol**: Official gene symbol (e.g., TP53, BRCA1)
   - **Organism**: Species name (e.g., Homo sapiens, Mus musculus)
   - **Mutation Type**: Classification (e.g., missense, nonsense, frameshift)
   - **Position**: Genomic coordinate or amino acid position
   - **Description**: Detailed mutation description

### Viewing Mutation Details

Click on any mutation to access:
- Complete genomic context with sequence visualization
- Gene metadata and functional annotations
- Links to external databases (UniProt, Ensembl)
- Chromosomal location and gene schematic

### Bulk Data Import

1. Prepare a CSV file with columns: `geneSymbol`, `organism`, `mutationType`, `mutationDescription`, `position`
2. Use the "Import CSV" button on the main page
3. The system will validate and import all mutations

### Data Export

Click "Export CSV" to download your complete mutation dataset for analysis in external tools like R, Python, or Excel.

## External APIs and Database Integration

### Ensembl REST API
- **Purpose**: Real-time genomic sequence retrieval
- **Endpoint**: `https://rest.ensembl.org/sequence/region/human/`
- **Functionality**: Fetches DNA sequences around mutation sites
- **Documentation**: https://rest.ensembl.org/

### MyGene.info API
- **Purpose**: Gene metadata and annotation retrieval
- **Endpoint**: `https://mygene.info/v3/query`
- **Functionality**: Provides gene names, chromosomal locations, functional summaries
- **Documentation**: https://docs.mygene.info/

### UniProt Integration
- **Purpose**: Protein-level information and functional domains
- **Access**: Direct linking to UniProt entries
- **Functionality**: Protein sequence, structure, and functional annotation
- **Website**: https://www.uniprot.org/

## Data Model

The application uses a MongoDB schema optimized for genomic data:

```javascript
{
  geneSymbol: String,        // Official gene symbol
  organism: String,          // Species name
  mutationType: String,      // Mutation classification
  mutationDescription: String, // Detailed description
  position: Number,          // Genomic or protein position
  createdAt: Date,          // Timestamp
  updatedAt: Date           // Last modification
}
```

## Contributing to Genomic Research

GeneTrackr is designed to be extensible for various research needs:

- **API Extensions**: Add new genomic database integrations
- **Visualization Modules**: Develop specialized views for specific mutation types
- **Export Formats**: Support for additional file formats (VCF, MAF, etc.)
- **Statistical Analysis**: Built-in tools for mutation frequency analysis
- **Collaborative Features**: Multi-user support for research teams

## Technical Architecture

- **Frontend**: React.js with responsive design for various devices
- **Backend**: Node.js/Express REST API
- **Database**: MongoDB for flexible genomic data storage
- **Styling**: Tailwind CSS for modern, accessible interface
- **Charts**: Recharts for mutation distribution visualization
- **File Processing**: PapaParse for CSV import/export

## License

This project is released under the Creative Commons CC0 1.0 Universal license, making it freely available for academic, research, and commercial use without restriction.

## Support and Documentation

For questions, bug reports, or feature requests related to genomic analysis capabilities, please create an issue in the GitHub repository. The project welcomes contributions from the bioinformatics and genomics research community.

---

*GeneTrackr: Empowering genomic research through accessible mutation tracking and visualization.*