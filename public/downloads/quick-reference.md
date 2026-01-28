# Claude Code Quick Reference - WordPress Development

## Essential Commands
| Command | Purpose | Example |
|---------|---------|---------|
| `claude` | Start new session | `cd /path/to/project && claude` |
| `claude --continue` | Resume last session | `claude --continue` |
| `/wp-perf-review [path]` | Full performance audit | `/wp-perf-review .` |
| `/security-audit [path]` | Security scan | `/security-audit wp-content/plugins/my-plugin` |
| `/clear` | Reset session context | `/clear` |
| `/context` | View context usage | `/context` |
| `/rewind` | Undo last changes | `/rewind` |

## Common Prompts

### ACF Development
```
"Create an ACF field group called [name] with fields: [list]"
"Display ACF fields from group [name] in template [file]"
"Add conditional logic to ACF field [name] based on [condition]"
"Create options page called [name] with ACF fields: [list]"
```

### Gutenberg Blocks
```
"Create a dynamic block [name] that [does something]"
"Add block controls for [options] to [block-name]"
"Implement server-side rendering for [block-name]"
"Create static block [name] with InnerBlocks for [purpose]"
```

### Custom Post Types
```
"Create a custom post type [name] with [fields/support]"
"Add custom columns to [cpt] admin list showing [fields]"
"Create archive template for [cpt] with [layout]"
"Add custom taxonomy [name] to [cpt] with [terms]"
```

### Debugging
```
"This code produces [error]. Find and fix the cause."
"Trace how [ACF field] value flows from save to display"
"Why is [feature] not working? Debug step by step."
"Find all N+1 query problems in [file/folder]"
"Identify deprecated functions in [file] and update them"
```

### Performance
```
"Optimize this query: [paste query]"
"Find slow database queries in [file]"
"Add caching to [function] using Transients API"
"Reduce hook calls in [file] for better performance"
"Analyze performance bottlenecks in [plugin/theme]"
```

### Security
```
"Audit [file] for security vulnerabilities"
"Add nonce verification to [form/AJAX handler]"
"Sanitize all inputs in [function]"
"Escape all outputs in [template]"
"Check capability permissions in [admin function]"
```

## Best Practices

### ✅ DO
- **Provide full context** in CLAUDE.md (WP version, ACF fields, CPTs)
- **Review git diff** after every Claude change
- **Use `/security-audit`** before every PR
- **Start small** with low-risk tasks
- **Run PHPCS and PHPUnit** before commits
- **Ask Claude to explain** complex changes
- **Use `/clear`** between unrelated tasks
- **Update CLAUDE.md** when project changes

### ❌ DON'T
- **Blindly accept** suggestions without review
- **Skip code review** process
- **Use on production** without testing
- **Forget to check** for deprecated functions
- **Ignore failures** from PHPCS/PHPUnit
- **Try complex tasks** before mastering basics
- **Over-correct** Claude mid-task (3+ corrections = /clear and restart)

## Emergency Troubleshooting

### Revert Claude's Changes
```bash
# See what changed
git diff

# Revert specific file
git checkout -- path/to/file.php

# Revert all changes
git reset --hard HEAD
```

### Claude Getting Stuck or Confused
```
# Reset the session
/clear

# Then restart with clearer prompt:
"I need to [specific task]. Here's the context: [details]"
```

### Disable Problematic Hook
Edit `~/.claude/hooks.json`:
```json
{
  "pattern": "problematic-pattern",
  "enabled": false
}
```

### Get Human Review First
```
"Show me the changes you're proposing before making them"
"Explain the trade-offs of approach A vs B"
"Generate a plan first, don't implement yet"
"What are the risks of this change?"
```

## WordPress-Specific Tips

### ACF Tips
- Always check if field exists: `if ($value = get_field('field_name')) { ... }`
- Use `the_field()` only for display, `get_field()` for logic
- For repeaters, always use `have_rows()` in while loop
- Options pages: `get_field('field_name', 'option')`

### Gutenberg Tips
- Dynamic blocks: Use `render_callback` for server-side PHP
- Static blocks: Use `save.js` for client-side rendering
- Always include `block.json` for metadata
- Use `InnerBlocks` for nested content areas

### Security Checklist
- [ ] All forms have `wp_nonce_field()` and verification
- [ ] All `$_GET`/`$_POST` data sanitized
- [ ] All output escaped (`esc_html`, `esc_attr`, `esc_url`)
- [ ] All database queries use `$wpdb->prepare()`
- [ ] All admin functions check `current_user_can()`

### Performance Checklist
- [ ] Expensive queries cached with Transients
- [ ] WP_Query uses specific post counts (not -1)
- [ ] Hooks minimized on 'init' action
- [ ] Images optimized (WebP, lazy loading)
- [ ] JavaScript deferred/async where possible

## Installation Reminder

### First-Time Setup
```bash
# Install Claude Code
curl https://code.claude.com/install.sh | bash

# Authenticate
claude login

# Navigate to WordPress project
cd /path/to/wordpress-project

# Create CLAUDE.md
cp /path/to/wordpress-claude-resources/.claude/CLAUDE_MD_TEMPLATE.md ./.claude/CLAUDE.md

# Edit to match your project
nano ./.claude/CLAUDE.md

# Start first session
claude
```

### Install WordPress Skills (Week 2)
```bash
# In a Claude Code session
/plugin marketplace add elvismdev/claude-wordpress-skills

# Now available:
/wp-perf-review [path]  # Performance audit
/wp-perf [path]         # Quick performance check
```

### Configure Hooks (Week 4)
```bash
# Copy template to project
cp /path/to/wordpress-claude-resources/.claude/HOOKS_CONFIG_TEMPLATE.json ~/.claude/hooks.json

# Or configure globally
claude hooks edit
```

## Resources
- **Slack**: #claude-code-help
- **Training Plan**: ~/.claude/plans/curious-sleeping-lagoon.md
- **Templates**: /Users/casey/wordpress-claude-resources/
- **Official Docs**: https://code.claude.com/docs

## Quick Wins to Try First

### Week 1: Start Here
1. Create CLAUDE.md for your project
2. Ask Claude to explain a complex plugin/theme
3. Add a simple admin notice to existing plugin
4. Generate documentation for a function

### Week 2: Build Confidence
1. Create ACF field group with 3-4 fields
2. Build custom post type with meta boxes
3. Create simple Gutenberg block
4. Fix a real bug from backlog

### Week 3: Advanced Usage
1. Debug production issue with error logs
2. Document entire legacy theme structure
3. Optimize slow database queries
4. Refactor old code to modern standards

---

**Remember**: Claude Code is **autonomous** (makes changes) not advisory (suggests changes). Always review git diff before committing!
