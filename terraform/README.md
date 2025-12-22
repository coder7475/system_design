Think of Terraform commands like tools in a toolbox:

• Each command has a specific purpose

• Some you'll use daily, others occasionally

• Knowing which tool to use when makes you efficient

• Master the basics first, then learn the advanced ones

Today we'll explore every important command in your Terraform toolkit!

🎯 The Core Workflow Commands (Your Daily Tools)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

These 4 commands form the backbone of every Terraform project:

1. terraform init 🚀

"Set up my workspace" - Downloads providers, initializes backend

2. terraform plan 🔍

"Show me what will change" - Preview without making changes

3. terraform apply ✅

"Make it happen" - Execute the planned changes

4. terraform destroy 💥

"Clean up everything" - Remove all managed resources

Master these four, and you can manage any infrastructure!

📋 The Information Commands (Your Inspection Tools)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

These commands help you understand what you have:

5. terraform show 📊

"What did I create?" - Display current state details

6. terraform output 📤

"Give me the results" - Show output values

7. terraform version 🏷️

"What version am I running?" - Check Terraform and provider versions

8. terraform providers 🔌

"What plugins am I using?" - List all providers

🔧 The Maintenance Commands (Your Cleanup Tools)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Keep your code and state healthy:

9. terraform validate ✅

"Is my code correct?" - Check syntax and configuration

10. terraform fmt 🎨

"Make it pretty" - Format code consistently

11. terraform refresh 🔄

"Update my knowledge" - Sync state with real infrastructure

🏗️ The Advanced Commands (Your Power Tools)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

For complex scenarios and troubleshooting:

12. terraform state 📋

"Manage my memory" - Manipulate state file

13. terraform import 📥

"Adopt existing infrastructure" - Bring external resources under management

14. terraform taint 🏷️

"Mark for replacement" - Force resource recreation

15. terraform workspace 🗂️

"Switch environments" - Manage multiple deployments

🎭 Command Categories by Use Case
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Daily Workflow:

init → plan → apply → show → output

Code Quality:

validate → fmt

Troubleshooting:

refresh → state list → state show

Environment Management:

workspace list → workspace new → workspace select

Emergency Situations:

destroy → taint → import

🚀 Real-World Command Patterns
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pattern 1: New Project Setup

```

terraform init

terraform validate

terraform plan

terraform apply

```

Pattern 2: Daily Development

```

terraform fmt

terraform validate

terraform plan

terraform apply

```

Pattern 3: Debugging Issues

```

terraform refresh

terraform show

terraform state list

terraform state show <resource>

```

Pattern 4: Clean Project Handoff

```

terraform fmt

terraform validate

terraform plan

terraform output

```

💡 Command Flags You Should Know
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Common flags that save time:

• -auto-approve: Skip confirmation prompts

• -out=filename: Save plan to file

• -var="key=value": Override variables

• -target=resource: Apply to specific resource only

• -lock=false: Skip state locking (use carefully!)

• -input=false: Don't ask for input

• -no-color: Plain text output (good for logs)

🎯 What You'll Learn Today
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

By the end of this lab, you'll:

• Know every essential Terraform command

• Understand when to use each command

• See practical examples of each command in action

• Build muscle memory for common workflows

• Be confident with the Terraform CLI

Ready to become a Terraform command-line master?
