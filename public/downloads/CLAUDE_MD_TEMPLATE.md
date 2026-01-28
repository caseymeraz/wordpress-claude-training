# WordPress Project Context for Claude Code

## Environment
- **WordPress Version**: 6.7.1
- **PHP Version**: 8.2
- **Database**: MySQL 8.0
- **Local Environment**: Local WP / MAMP / Docker
- **Staging**: [URL]
- **Production**: [URL]

## Theme
- **Name**: [Theme Name]
- **Type**: Custom / Child Theme
- **Parent**: GeneratePress / None
- **Build Tools**: webpack / Vite / None

## Active Plugins
### Critical Dependencies
- Advanced Custom Fields PRO 6.2.x
- [Other critical plugins]

### Development Tools
- Query Monitor (dev only)
- Debug Bar (dev only)

## Custom Post Types
- **CPT**: `portfolio` (supports: title, editor, thumbnail, custom-fields)
  - Archive: archive-portfolio.php
  - Single: single-portfolio.php

- **CPT**: `testimonial` (supports: title, editor, thumbnail)
  - Archive: None (private)
  - Single: Used in shortcode only

## ACF Field Groups
### Portfolio Details (ID: group_portfolio_details)
- `project_url` (URL field)
- `project_client` (Text field)
- `project_date` (Date Picker)
- `project_featured` (True/False)

### Page Layout (ID: group_page_layout)
- `layout_sections` (Repeater)
  - `section_type` (Select: hero, content, gallery)
  - `section_content` (Flexible Content)

## Gutenberg Blocks
- **Block**: Featured Post (namespace/featured-post)
  - Location: blocks/featured-post/
  - Type: Dynamic (server-side render)

- **Block**: Team Grid (namespace/team-grid)
  - Location: blocks/team-grid/
  - Type: Static

## Coding Standards
- **Standard**: WordPress-Core, WordPress-Extra
- **PHPCS**: vendor/bin/phpcs --standard=WordPress
- **Auto-fix**: vendor/bin/phpcbf --standard=WordPress
- **Line Length**: 100 characters
- **Indentation**: Tabs (WordPress standard)

## Security Requirements
✅ Always use:
- `wp_nonce_field()` and `wp_verify_nonce()` for forms
- `sanitize_text_field()`, `sanitize_email()` for inputs
- `esc_html()`, `esc_attr()`, `esc_url()` for outputs
- `$wpdb->prepare()` for database queries
- `current_user_can()` for capability checks

## Performance Requirements
- Cache expensive queries using Transients API
- Use WP_Query with specific post counts (no -1)
- Minimize hooks on 'init' action
- Optimize images (WebP, lazy loading)
- Defer non-critical JavaScript

## Testing
- **PHPUnit**: `composer test` (must pass before commit)
- **PHPCS**: `composer lint` (0 violations required)
- **Browser Testing**: Chrome, Firefox, Safari (latest 2 versions)
- **Responsive**: Mobile (375px), Tablet (768px), Desktop (1440px)

## Git Workflow
- **Branches**: main → staging → feature/[name]
- **Commits**: Conventional Commits (feat:, fix:, docs:)
- **Pre-commit**: PHPCS + PHPUnit via hooks
- **Code Review**: Required before merge

## Development Preferences
- Prefer WordPress core functions over third-party
- Follow WordPress template hierarchy
- Use meaningful variable names
- Document complex logic with inline comments
- Modern PHP (8.0+ features encouraged)

---

## Instructions for Claude Code

When working on this project:

1. **Follow WordPress Coding Standards** exactly (tabs, spacing, naming)
2. **Prioritize security** - verify nonces, sanitize inputs, escape outputs
3. **Optimize for performance** - cache queries, minimize database calls
4. **Test before committing** - run PHPCS and PHPUnit automatically
5. **Use WordPress functions** - prefer core over reinventing
6. **ACF-specific**: Use `get_field()` and `the_field()` properly, handle false returns
7. **Gutenberg blocks**: Use block.json for metadata, server-side rendering for dynamic content

## ACF Quick Reference
- Get field: `get_field('field_name', $post_id)`
- Check if exists: `$value = get_field('field_name'); if ($value) { ... }`
- Repeater: `if (have_rows('repeater_field')) { while (have_rows('repeater_field')) { the_row(); } }`
- Options page: `get_field('field_name', 'option')`

## Gutenberg Quick Reference
- Register block: Use `register_block_type()` with block.json
- Dynamic blocks: Use `render_callback` for server-side rendering
- InnerBlocks: For nested content areas
- Block supports: Set in block.json (align, anchor, etc.)
