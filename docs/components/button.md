---
title: Button
lang: en-US
---

# Button

> The button component for Tailwindcss-Vue offers varients in color and two different styles - **solid** and **outlined**.

## Varients
### Solid

<tv-button>Default</tv-button> 
<tv-button variant="primary">Primary</tv-button>
<tv-button variant="success">Success</tv-button>
<tv-button variant="warning">Warning</tv-button>
<tv-button variant="danger">Danger</tv-button>
<tv-button variant="info">Info</tv-button>

``` html
<tv-button>Default</tv-button> 
<tv-button variant="primary">Primary</tv-button>
<tv-button variant="success">Success</tv-button>
<tv-button variant="warning">Warning</tv-button>
<tv-button variant="danger">Danger</tv-button>
<tv-button variant="info">Info</tv-button>
```

> Change the color by adding the by adding the **variant** attribute with the desired value.

### Outlined

<tv-button outline>Default</tv-button> 
<tv-button variant="primary" outline>Primary</tv-button>
<tv-button variant="success" outline>Success</tv-button>
<tv-button variant="warning" outline>Warning</tv-button>
<tv-button variant="danger" outline>Danger</tv-button>
<tv-button variant="info" outline>Info</tv-button>

``` html
<tv-button outline>Default</tv-button> 
<tv-button variant="primary" outline>Primary</tv-button>
<tv-button variant="success" outline>Success</tv-button>
<tv-button variant="warning" outline>Warning</tv-button>
<tv-button variant="danger" outline>Danger</tv-button>
<tv-button variant="info" outline>Info</tv-button>
```

> Change the button to the outline style by adding the **outline** attribute.

## Sizes

<tv-button size="sm" class="mb-2">Small</tv-button><br>
<tv-button class="mb-2">Default</tv-button><br>
<tv-button size="lg">Large</tv-button>

``` html
<tv-button size="sm">Small</tv-button> 
<tv-button>Default</tv-button> 
<tv-button size="lg">Large</tv-button>
```
> Change the button size by adding the **size** attribute with the desired value. Valid values are **sm** and **lg**.