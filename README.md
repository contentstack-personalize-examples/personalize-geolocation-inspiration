# Contentstack Personalize Geolocation Example

This example demonstrates geolocation-based personalization using Contentstack Personalize. It includes:

- Contentstack SDK integration
- Personalize Edge SDK for real-time personalization
- Live preview and Visual Experience setup
- Geolocation-based content delivery
- Impression tracking and analytics

> This example uses Next.js Server-Side Rendering with Contentstack Live Preview. Contentstack adds query parameters to the URL for live preview functionality and refreshes the browser on content edits.

[![Join us on Discord](https://img.shields.io/badge/Join%20Our%20Discord-7289da.svg?style=flat&logo=discord&logoColor=%23fff)](https://community.contentstack.com)

## Prerequisites

- Node.js 18+ installed
- Contentstack account
- Basic understanding of Next.js and React

## Quick Setup

### 1. Install the Contentstack CLI

```bash
npm install -g @contentstack/cli
```

#### First time using the CLI?

It might ask you to set your default region.
You can get all regions and their codes [here](https://www.contentstack.com/docs/developers/cli/configure-regions-in-the-cli) or run `csdx config:get:region`.

> Beware, Free Contentstack developer accounts are bound to the EU region. We still use the CDN for content delivery and the API is lightning fast.

Set your region like so:

```bash
csdx config:set:region EU
```

You can check available regions with:
```bash
csdx config:get:region
```

### 2. Log in via the CLI

```bash
csdx auth:login
```

### 3. Import Content and Configuration

This project includes a complete stack configuration in the `stack/` directory. Import it directly:

```bash
# Get your organization UID from Contentstack dashboard (Org admin section)
# Replace <YOUR_ORG_ID> with your actual Organization ID

# Create a new stack and import content
csdx cm:stacks:create --org "<YOUR_ORG_ID>" -n "Geolocation Personalization Example"

# Get the API key of your newly created stack
# Then import the content from the stack directory
csdx cm:stacks:import -k <YOUR_STACK_API_KEY> -d "./stack"
```

### 4. Create Delivery Tokens

1. Go to `Settings > Tokens` in your Contentstack dashboard
2. Create a new delivery token
3. Select the `preview` scope
4. Turn on `Create preview token`
5. Save the token

### 5. Configure Environment Variables

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your environment variables:

```env
# Contentstack Configuration
NEXT_PUBLIC_CONTENTSTACK_API_KEY=<YOUR_API_KEY>
NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN=<YOUR_DELIVERY_TOKEN>
NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN=<YOUR_PREVIEW_TOKEN>
NEXT_PUBLIC_CONTENTSTACK_REGION=EU
NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=preview
NEXT_PUBLIC_CONTENTSTACK_PREVIEW=true

# Personalize Configuration
NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID=<YOUR_PERSONALIZE_PROJECT_UID>

# Middleware Configuration
# Set to true for local development and Vercel deployments
# Set to false for Contentstack Launch deployments
USE_NEXT_MIDDLEWARE=true
```

> **Important**: Find your Personalize Project UID in the Contentstack dashboard under Personalize settings.

### 6. Enable Live Preview

1. Go to `Settings > Live Preview` in Contentstack
2. Click "Enable"
3. Select the `Preview` environment
4. Set the preview URL to your local development URL (e.g., `http://localhost:3000`)
5. Save the configuration

### 7. Install Dependencies and Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see your personalized site!

## Environment Variables Guide

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CONTENTSTACK_API_KEY` | ✅ | Your Contentstack stack API key |
| `NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN` | ✅ | Delivery token for content fetching |
| `NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN` | ✅ | Preview token for live preview functionality |
| `NEXT_PUBLIC_CONTENTSTACK_REGION` | ✅ | Your Contentstack region (EU, US, etc.) |
| `NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT` | ✅ | Environment to fetch content from |
| `NEXT_PUBLIC_CONTENTSTACK_PREVIEW` | ✅ | Enable/disable preview mode |
| `NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID` | ✅ | Personalize project identifier |
| `USE_NEXT_MIDDLEWARE` | ⚠️ | Middleware configuration (see below) |

### Middleware Configuration (`USE_NEXT_MIDDLEWARE`)

This variable controls whether Next.js middleware is used for geolocation detection:

- **Set to `true`**: For local development and Vercel deployments
- **Set to `false`**: For Contentstack Launch deployments (Launch handles geolocation automatically)

## Project Structure

```
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with PersonalizeProvider
│   └── page.tsx                 # Home page with server-side rendering
├── components/
│   ├── context/
│   │   └── PersonalizeContext.tsx # Personalize SDK context
│   ├── BestSellers.tsx          # Product showcase component
│   ├── Header.tsx               # Navigation component
│   ├── HeroBanner.tsx           # Hero section with personalized content
│   └── ImpressionTracker.tsx    # Analytics and impression tracking
├── lib/
│   ├── contentstack.ts          # Contentstack SDK configuration
│   └── types.ts                 # TypeScript type definitions
├── middleware.ts                # Geolocation middleware (when USE_NEXT_MIDDLEWARE=true)
├── functions/
│   └── [proxy].edge.js          # Edge function for Launch deployments
└── stack/                       # Complete stack configuration for import
```

## Features

### 🌍 Geolocation-Based Personalization
- Automatic user location detection
- Region-specific content delivery
- Fallback content for unknown locations

### 📊 Analytics & Tracking
- Impression tracking for personalized variants
- Real-time analytics integration
- User behavior insights

### 🎨 Live Preview & Visual Experience
- Real-time content editing
- Visual Experience builder support
- Hot-reloading for content changes

### ⚡ Performance Optimized
- Server-side rendering for SEO
- Edge-side personalization
- Optimized bundle splitting

## Deployment

### Vercel Deployment
1. Set `USE_NEXT_MIDDLEWARE=true` in your Vercel environment variables
2. Deploy normally with `vercel --prod`

### Contentstack Launch Deployment
1. Set `USE_NEXT_MIDDLEWARE=false` in your Launch environment variables
2. Launch automatically handles geolocation through edge functions

## Testing Personalization

### Local Development Limitations

**Important**: Geolocation-based personalization relies on your IP address to determine location. When running locally (`localhost:3000`), the system may not detect your location accurately or may default to your ISP's location, which could differ from the targeted regions (Arizona/Chicago in this example).

For the most accurate testing of geolocation features, deploy your application to Contentstack Launch or another hosting platform.

### Testing Methods

1. **Local Development Options**:
   - Use browser developer tools to simulate different geolocations (limited effectiveness)
   - Modify audience rules in Contentstack to match your current location (see below)
   - Use VPN services to test from different geographic locations

2. **Modify Audience Rules for Testing**:
   - Go to your Contentstack dashboard
   - Navigate to `Personalize > Audiences`
   - Find the existing audiences (e.g., "Arizona Visitors" or "Chicago Visitors")
   - Edit the location rules to match your current location or a location you can test from
   - Save the changes and test the personalization

3. **Production Testing**:
   - Deploy to Contentstack Launch for most accurate geolocation detection
   - Test from different geographic locations or use VPN services
   - Monitor analytics to see personalization effectiveness

4. **Audience Preview in Timeline**: Use Contentstack's preview functionality to see variant changes in real-time. More details [here](https://www.contentstack.com/docs/content-managers/timeline/audience-preview).

## Troubleshooting

### Common Issues

1. **Personalization not working**: Verify your `NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID` is correct
2. **Live preview not loading**: Check that your preview URL is correctly configured in Contentstack
3. **Geolocation not detected**: Ensure `USE_NEXT_MIDDLEWARE` is set correctly for your deployment platform
4. **Location-based content not showing locally**: 
   - Remember that localhost may not provide accurate geolocation
   - Consider modifying audience rules to match your test location
   - Deploy to Launch for accurate IP-based geolocation detection
5. **Different content than expected**: Check that your current location matches the audience rules (Arizona/Chicago by default)

### Getting Help

- Check the [Contentstack documentation](https://www.contentstack.com/docs/developers)
- Join our [Discord community](https://community.contentstack.com)
- Review the [Personalize documentation](https://www.contentstack.com/docs/personalize)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
