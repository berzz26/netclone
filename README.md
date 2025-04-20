# Netflix Clone

A responsive Netflix clone built with modern web technologies. This project replicates core Netflix functionalities including browsing movies/shows, user authentication, and responsive design.

##  Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **Styling**: TailwindCSS
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Authentication**: Custom auth implementation with localStorage

##  Features

- Responsive design that works on desktop and mobile
- Movie/TV show browsing
- Search functionality
- Detailed view for movies and TV shows
- User authentication (demo)
- Protected routes
- Slider component for movie lists
- Loading states and error handling
- Image lazy loading and fallbacks

##  Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── layout/          # Layout components
│   └── movies/          # Movie-related components
├── context/             # Auth context and state management
├── pages/               # Page components
├── services/           # API services
└── types/              # TypeScript type definitions
```

##  Installation

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

##  Demo Credentials

- Email: user@example.com
- Password: password

## Features

### Components
- **Navbar**: Responsive navigation with search and user menu
- **MovieSlider**: Horizontal scrollable movie list
- **MovieCard**: Interactive movie cards with hover effects
- **HeroBanner**: Featured content showcase

### Pages
- **Home**: Landing page with movie categories
- **MovieDetail**: Detailed movie/show information
- **Search**: Search functionality
- **Login/Signup**: Authentication pages

### API Integration
- Uses TMDB API for movie data
- Categories include:
  - Trending content
  - Popular movies/shows
  - Top-rated content
  - Search results

##  Responsive Design
- Mobile-first approach
- Breakpoints for various screen sizes
- Optimized images and layouts
- Touch-friendly interactions

##  Authentication
- Demo login/signup functionality
- Protected routes
- Persistent sessions
- User menu with logout

##  Data Source
Movie data is provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)

