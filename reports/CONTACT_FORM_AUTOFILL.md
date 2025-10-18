# Contact Form Auto-Fill Feature

## Date: October 16, 2025

## Objective
Enable the "Inquire Now" button on car detail pages to automatically open and pre-fill the contact form with vehicle-specific information.

## Implementation

### 1. **Context API Setup**
Created `ContactFormContext.tsx` to manage form state globally across pages.

**Features:**
- `formData`: Stores pre-filled data (vehicleSlug, vehicleName, message)
- `openContactForm()`: Accepts vehicle data and scrolls to contact section
- `isFormOpen`: Tracks when form should highlight/focus
- Auto-generates inquiry message based on vehicle details

**Location:** `src/contexts/ContactFormContext.tsx`

### 2. **VehicleHeader Component Updates**
Updated the button text and functionality.

**Changes:**
- Button text: "Contact Seller" → "Inquire Now"
- Added `useContactForm()` hook integration
- `handleInquireClick()` function calls `openContactForm(vehicle)`
- Passes full vehicle object to context

**Location:** `src/components/car/VehicleHeader.tsx`

### 3. **ContactFormSection Updates**
Enhanced form to accept and display pre-filled data.

**Changes:**
- Integrated `useContactForm()` hook
- Added state management for message field
- `useEffect` to auto-fill form when vehicle data is provided
- Visual feedback: 2-second highlight ring when form is auto-filled
- Smooth scroll to contact section

**Location:** `src/components/home/ContactFormSection.tsx`

### 4. **Layout Integration**
Wrapped application with ContactFormProvider.

**Changes:**
- Added provider to root layout (`src/app/layout.tsx`)
- Makes context available across all pages
- Enables communication between car pages and contact form

### 5. **Car Page Updates**
Removed duplicate contact form from car pages.

**Changes:**
- Contact form only exists on homepage
- "Inquire Now" navigates to homepage with context
- Cleaner car detail pages without form duplication

**Location:** `src/app/car/[slug]/page.tsx`

## User Flow

### Before (Manual):
1. User views car details
2. Clicks "Contact Seller"
3. Navigates to home page
4. Scrolls to contact section
5. Manually fills in vehicle information
6. Submits inquiry

### After (Automated): ✅
1. User views car details
2. Clicks **"Inquire Now"**
3. ✅ **Automatically navigates to homepage**
4. ✅ **Scrolls to contact form section**
5. ✅ **Vehicle is pre-selected in dropdown**
6. ✅ **Message is pre-filled with vehicle details**
7. ✅ **Visual highlight confirms auto-fill**
8. User adds name, email, country
9. Submits inquiry

## Technical Details

### Auto-Fill Data Structure
```typescript
{
  vehicleSlug: 'bentley-bentayga-2020',
  vehicleName: '2020 Bentley Bentayga',
  message: 'I am interested in the 2020 Bentley Bentayga. Please provide more information about this vehicle.'
}
```

### Context Flow
```
VehicleHeader (Car Page)
    ↓ Click "Inquire Now"
ContactFormContext.openContactForm(vehicle)
    ↓ Check if on homepage
    ├─ Yes: Scroll to #contact
    └─ No: Navigate to /#contact
        ↓
Homepage ContactFormSection
    ↓ useEffect detects formData
Form Fields Auto-Fill
    ↓ Visual Highlight (2s)
User Completes & Submits
```

### Visual Feedback
When form is auto-filled:
- **Ring effect**: 4px red ring with offset
- **Duration**: 2 seconds
- **Classes**: `ring-4 ring-[#d10e22]/50 ring-offset-4`
- **Behavior**: Automatically removes after highlight

## Files Modified

1. **Created:**
   - `src/contexts/ContactFormContext.tsx` - Context provider

2. **Updated:**
   - `src/components/car/VehicleHeader.tsx` - Button functionality
   - `src/components/home/ContactFormSection.tsx` - Auto-fill logic
   - `src/app/layout.tsx` - Provider wrapper
   - `src/app/car/[slug]/page.tsx` - No duplicate form
   - `src/contexts/ContactFormContext.tsx` - Navigation logic

## Benefits

✅ **Improved UX**: One-click inquiry with pre-filled data
✅ **Reduced Friction**: No manual vehicle selection needed
✅ **Higher Conversion**: Easier inquiry process = more leads
✅ **Better Context**: Auto-generated message includes vehicle details
✅ **Visual Feedback**: Users see confirmation of auto-fill
✅ **Smooth Navigation**: Automatic redirect and scroll to contact
✅ **Consistent Experience**: Works across all car pages
✅ **Single Source of Truth**: One contact form on homepage only

## Testing Checklist

- [ ] Click "Inquire Now" on any car detail page
- [ ] Verify smooth scroll to contact section
- [ ] Check vehicle is pre-selected in dropdown
- [ ] Confirm message field is pre-filled
- [ ] Observe 2-second highlight ring
- [ ] Test on mobile and desktop
- [ ] Verify form submission with pre-filled data
- [ ] Check multiple vehicles use correct data

## Future Enhancements

- Add analytics tracking for inquiry button clicks
- Email template integration with vehicle details
- Save inquiry history for returning users
- A/B test different pre-filled message formats

---

**Status**: ✅ Implemented and ready for testing
**Build**: ⏳ Awaiting user approval before build
