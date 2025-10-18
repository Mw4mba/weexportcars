# Contact Form Auto-Fill Debugging Guide

## Date: October 16, 2025

## Testing Steps

### 1. Test the Navigation
1. Go to any car page, e.g., `/car/bentley-bentayga-2020`
2. Click "Inquire Now" button
3. **Expected URL**: `/?vehicleSlug=bentley-bentayga-2020&vehicleName=2020%20Bentley%20Bentayga#contact`
4. Check browser console for logs

### 2. Check Console Logs
Look for these debug messages in order:

```
URL Params: { vehicleSlug: "bentley-bentayga-2020", vehicleName: "2020 Bentley Bentayga" }
Setting form data: { vehicleSlug: "...", vehicleName: "...", message: "..." }
Form data changed: { vehicleSlug: "...", vehicleName: "...", message: "..." }
Auto-filling form with: bentley-bentayga-2020
Vehicle selected: bentley-bentayga-2020
```

### 3. Verify Form Fields
After clicking "Inquire Now":
- [ ] Page redirects to homepage
- [ ] Scrolls to contact section
- [ ] Red highlight ring appears (2 seconds)
- [ ] Vehicle dropdown shows selected car
- [ ] Message textarea contains pre-filled text
- [ ] URL changes to `/#contact` (params removed)

### 4. Manual URL Test
Test directly by pasting this URL in browser:
```
http://localhost:3000/?vehicleSlug=bentley-bentayga-2020&vehicleName=2020%20Bentley%20Bentayga#contact
```

Expected result:
- Homepage loads
- Scrolls to contact form
- Form auto-fills
- Console shows all debug logs

## Common Issues & Fixes

### Issue 1: URL Parameters Not Being Read
**Symptoms**: Console shows `URL Params: { vehicleSlug: null, vehicleName: null }`

**Cause**: Hash (#) is in wrong position in URL

**Fix**: Ensure URL format is `/?params#hash` NOT `/#hash?params`

**Code location**: `ContactFormContext.tsx` line ~35
```typescript
window.location.href = `/?${params.toString()}#contact`;  // ✅ Correct
// NOT: `/#contact?${params.toString()}`  // ❌ Wrong
```

### Issue 2: Form Not Auto-Filling
**Symptoms**: Console shows params but form fields are empty

**Cause**: Select component not re-rendering with new value

**Fix**: Added `key` prop to force re-render
```typescript
<Select 
  key={selectedVehicle || 'empty'}  // Forces re-render when value changes
  value={selectedVehicle}
  ...
/>
```

### Issue 3: Context Data Not Setting
**Symptoms**: `setFormData` called but `formData` doesn't update

**Cause**: Context provider not wrapping component

**Fix**: Verify `ContactFormProvider` is in `layout.tsx`

### Issue 4: Message Not Showing
**Symptoms**: Vehicle dropdown works but message textarea is empty

**Cause**: Message state not being updated

**Check**: Console log in second useEffect should show message

## Debug Checklist

Run through this checklist:

1. **VehicleHeader.tsx**
   - [ ] `useContactForm()` hook is imported
   - [ ] `openContactForm(vehicle)` is called on button click
   - [ ] Vehicle object contains slug, year, make, model

2. **ContactFormContext.tsx**
   - [ ] URL format: `/?vehicleSlug=...&vehicleName=...#contact`
   - [ ] `setFormData()` is called with vehicle data
   - [ ] `setIsFormOpen(true)` is called

3. **ContactFormSection.tsx**
   - [ ] First useEffect reads URL params
   - [ ] `setFormData()` is called with extracted params
   - [ ] Second useEffect detects `formData.vehicleSlug`
   - [ ] `setSelectedVehicle()` is called
   - [ ] `setMessage()` is called

4. **Layout.tsx**
   - [ ] `ContactFormProvider` wraps children
   - [ ] Provider is at root level

## Expected Console Output

When clicking "Inquire Now", you should see:

```javascript
// From ContactFormSection.tsx (first useEffect)
URL Params: {
  vehicleSlug: "bentley-bentayga-2020",
  vehicleName: "2020 Bentley Bentayga"
}

Setting form data: {
  vehicleSlug: "bentley-bentayga-2020",
  vehicleName: "2020 Bentley Bentayga",
  message: "I am interested in the 2020 Bentley Bentayga. Please provide more information about this vehicle."
}

// From ContactFormSection.tsx (second useEffect)
Form data changed: {
  vehicleSlug: "bentley-bentayga-2020",
  vehicleName: "2020 Bentley Bentayga",
  message: "I am interested in the 2020 Bentley Bentayga. Please provide more information about this vehicle."
}

Auto-filling form with: bentley-bentayga-2020

// From Select onValueChange
Vehicle selected: bentley-bentayga-2020
```

## If Still Not Working

### Step 1: Verify Vehicle Slug Matches
Check that the vehicle slug in URL matches exactly with vehicleData:

```typescript
// In vehicleData.ts
{
  slug: "bentley-bentayga-2020",  // Must match exactly
  year: 2020,
  make: "Bentley",
  model: "Bentayga",
  ...
}
```

### Step 2: Check Select Options
Verify the Select has options with matching values:

```typescript
stockVehicles = [
  { value: "bentley-bentayga-2020", label: "2020 Bentley Bentayga" },
  // ... other vehicles
]
```

### Step 3: Test State Updates
Add this temporary code to ContactFormSection:

```typescript
useEffect(() => {
  console.log('Selected vehicle state:', selectedVehicle);
}, [selectedVehicle]);

useEffect(() => {
  console.log('Message state:', message);
}, [message]);
```

### Step 4: Clear Browser Cache
- Hard reload: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Or clear cache in DevTools > Network tab > "Disable cache"

## Remove Debug Logs

Once working, remove these console.log statements:
- Line ~29 in ContactFormSection.tsx: `console.log('URL Params:', ...)`
- Line ~35 in ContactFormSection.tsx: `console.log('Setting form data:', ...)`
- Line ~54 in ContactFormSection.tsx: `console.log('Form data changed:', ...)`
- Line ~56 in ContactFormSection.tsx: `console.log('Auto-filling form with:', ...)`
- Line ~143 in ContactFormSection.tsx: `console.log('Vehicle selected:', ...)`

---

**Current Status**: Debug logs added, awaiting test results
**Next Step**: Check browser console for debug output
