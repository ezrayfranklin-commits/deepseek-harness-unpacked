// Generated from deepseek-ai/deepseek-harness. Do not edit by hand.
export const toolCatalog = [
  {
    "name": "ask_user_question",
    "packageName": "@deepseek-ai/dsh-tool-ask-user",
    "category": "Interaction",
    "description": "Ask the user a concise question when you need confirmation, a choice, or missing information before proceeding. Send one or more questions, each with a stable id that will be echoed in the answer.",
    "params": [
      "questions"
    ],
    "source": "packages/interaction/tool-ask-user/src/index.ts"
  },
  {
    "name": "run_code",
    "packageName": "@deepseek-ai/dsh-tools",
    "category": "Planning & Workflow",
    "description": "Execute a TypeScript program against the available tools. Takes two required arguments: `code`, the BODY of an async function (erasable syntax only; top-level `await` and `return` work), and `description`, a short summary of what the program does. Call tools as `await tools.name(args)` per the declarations in the system prompt. Only what you print or return comes back — curate it.",
    "params": [
      "code",
      "description"
    ],
    "source": "packages/core/tools/src/code-mode.ts"
  },
  {
    "name": "exit_plan_mode",
    "packageName": "@deepseek-ai/dsh-plan-mode",
    "category": "Planning & Workflow",
    "description": "Use only in plan mode. Present your plan for the user's review and, on approval, leave plan mode. Send the COMPLETE plan as markdown, starting with a # heading that names it. The user may approve (carry out the plan from your next step) or keep planning — their feedback comes back in the tool result; revise and present again.",
    "params": [
      "plan"
    ],
    "source": "packages/plan/plan-mode/src/index.ts"
  },
  {
    "name": "bash",
    "packageName": "@deepseek-ai/dsh-tool-bash",
    "category": "Shell & Terminal",
    "description": "Execute a bash command (`bash -c`) and return its stdout/stderr. Each call runs in a fresh shell: no state (cwd, variables, functions) persists between calls — pass `workdir` instead of using `cd`. Non-zero exits are reported as `[exit code: N]`. Current harness environment facts are exposed through managed `$DSH_*` variables; inspect them when needed. Commands may run under a file sandbox; a blocked file operation is reported as `[sandbox: file access denied under <mode> mode]` — a policy denial, not a bug in the command; do not retry another way. Long output is truncated to its tail; the full output is saved to a file whose path is reported when available. Set `run_in_background: true` for long-running commands: the call returns a job id immediately; read its output with `job_output` and stop it with `job_kill`.",
    "params": [
      "command",
      "description",
      "timeoutMs",
      "workdir",
      "run_in_background"
    ],
    "source": "packages/shell/tool-bash/src/index.ts"
  },
  {
    "name": "pwsh",
    "packageName": "@deepseek-ai/dsh-tool-pwsh",
    "category": "Shell & Terminal",
    "description": "Execute a PowerShell command (`pwsh -Command`) and return its stdout/stderr. Each call runs in a fresh pwsh process: no state (cwd, variables, functions) persists between calls — pass `workdir` instead of using `cd`. Paths use native Windows form (`C:\\...`); read environment variables with `$env:NAME`. Non-zero exits are reported as `[exit code: N]`. Current harness environment facts are exposed through managed `$env:DSH_*` variables; inspect them when needed. Commands may run under a file sandbox; a blocked file operation is reported as `[sandbox: file access denied under <mode> mode]` — a policy denial, not a bug in the command; do not retry another way. Long output is truncated to its tail; the full output is saved to a file whose path is reported when available. On Windows a force-killed command settles as `[exit code: 1]` without a signal marker — treat it as an interruption, not a command failure. Set `run_in_background: true` for long-running commands: the call returns a job id immediately; read its output with `job_output` and stop it with `job_kill`.",
    "params": [
      "command",
      "description",
      "timeoutMs",
      "workdir",
      "run_in_background"
    ],
    "source": "packages/shell/tool-pwsh/src/index.ts"
  },
  {
    "name": "cordis_define",
    "packageName": "@deepseek-ai/dsh-tool-cordis",
    "category": "Cordis Runtime",
    "description": "Define an immutable Cordis Package. For a new Plugin, use kind:\"new\" and provide only a semantic prefix of 3–6 lowercase English letters; the Host returns the final pluginId and packageId. To modify an existing Plugin, use kind:\"existing\" with its exact pluginId to append a Package without overwriting older versions. Provide at least one of code.host and code.client. Each value is a plain JavaScript function body that returns a Cordis Plugin; no TypeScript, JSX, or import transformation occurs. Query Inspect before depending on a Service, Event, Builtin, Slot, or token. Define only validates parameters and syntax and records source: it does not request approval, execute apply, or change currentPackageId. On success, call cordis_run with the returned IDs.",
    "params": [
      "plugin",
      "name",
      "purpose",
      "code"
    ],
    "source": "packages/extensions/tool-cordis/src/index.ts"
  },
  {
    "name": "cordis_inspect_list",
    "packageName": "@deepseek-ai/dsh-tool-cordis",
    "category": "Cordis Runtime",
    "description": "List every Cordis Inspect Provider currently known to the Host, including local Host Providers and the latest manifests synchronized from the Client. Each entry includes its platform, purpose, read-only methods, and input/output schemas. Call this Tool before creating or modifying a Package, then select the provider and method for cordis_inspect_query from its result. Do not guess names or treat an Inspect method as a business Service that Plugin code can call.",
    "params": [],
    "source": "packages/extensions/tool-cordis/src/index.ts"
  },
  {
    "name": "cordis_inspect_query",
    "packageName": "@deepseek-ai/dsh-tool-cordis",
    "category": "Cordis Runtime",
    "description": "Run a read-only query explicitly declared by an Inspect Provider. platform, provider, and method must come from cordis_inspect_list, and input must satisfy that method's schema. Use this Tool before cordis_define to read exact Service methods, Event modes, Builtin signatures, Tool schemas, theme tokens, or live Slot trees and props. Host queries run locally. A Client query waits for the first valid page response and remains pending until a page answers or the Tool is cancelled. This Tool cannot invoke business Service methods or modify the runtime. For Service.listService and Event.listEvents, query without input to navigate the compact signature directory, then query the exact service or event for its structured contract and referenced types. For Slots.listSubTree, query without root to navigate the compact tree, then query the exact root for its complete registration contract and props.",
    "params": [
      "platform",
      "provider",
      "method",
      "input"
    ],
    "source": "packages/extensions/tool-cordis/src/index.ts"
  },
  {
    "name": "cordis_inspect_self",
    "packageName": "@deepseek-ai/dsh-tool-cordis",
    "category": "Cordis Runtime",
    "description": "Inspect dynamic Cordis objects owned by the current Session at increasing levels of detail. With no IDs, list only Plugin summaries. With pluginId alone, return version pointers, the latest Run, and every Package summary. Only pluginId plus packageId returns that immutable Package's Host/Client source and runtime diagnostics. packageId cannot be supplied alone. Query an exact Package before handling @pluginId, repairing an asynchronous failure, or defining an updated version. This Tool is read-only: it neither executes code nor changes version pointers.",
    "params": [
      "pluginId",
      "packageId"
    ],
    "source": "packages/extensions/tool-cordis/src/index.ts"
  },
  {
    "name": "cordis_run",
    "packageName": "@deepseek-ai/dsh-tool-cordis",
    "category": "Cordis Runtime",
    "description": "Activate one exact Package of a dynamic Plugin. Use mode:\"run\" for the first activation, restarting currentPackageId, or rollback. When current exists, use mode:\"update\" to switch to a different Package, even if the Plugin is currently stopped. An unauthorized Client Package creates an approval request and returns awaiting-approval; an authorized Package returns starting and continues asynchronously in the browser. Neither result waits for the final outcome inside the Tool. currentPackageId changes only after complete success; on failure, the old current and target next remain. Asynchronous success, rejection, or technical failure is reported through state and steering. After a technical failure, read diagnostics with cordis_inspect_self, correct the same Plugin, and retry autonomously. Do not request approval again after the user rejects it.",
    "params": [
      "pluginId",
      "packageId",
      "mode"
    ],
    "source": "packages/extensions/tool-cordis/src/index.ts"
  },
  {
    "name": "cordis_stop",
    "packageName": "@deepseek-ai/dsh-tool-cordis",
    "category": "Cordis Runtime",
    "description": "Stop the current Run of a dynamic Plugin and cancel unfinished approval or activation requests. Retain the Plugin, every immutable Package, grants, currentPackageId, and nextPackageId so it can later run or update directly. Stopping an already stopped Plugin succeeds idempotently. Use this Tool to disable effects temporarily; use cordis_undefine for permanent removal.",
    "params": [
      "pluginId"
    ],
    "source": "packages/extensions/tool-cordis/src/index.ts"
  },
  {
    "name": "cordis_undefine",
    "packageName": "@deepseek-ai/dsh-tool-cordis",
    "category": "Cordis Runtime",
    "description": "Permanently remove a dynamic Plugin owned by the current Session. If it is running or awaiting approval, first stop it and cancel the request, then delete every Package, grant, and version pointer. After this returns, its pluginId, packageIds, @ reference, and Package business views are invalid; historical cards retain only a \"Plugin removed\" record. Do not call this Tool when versions must remain available for restart or rollback; use cordis_stop instead.",
    "params": [
      "pluginId"
    ],
    "source": "packages/extensions/tool-cordis/src/index.ts"
  },
  {
    "name": "bash",
    "packageName": "@deepseek-ai/dsh-tool-bash-persistent",
    "category": "Shell & Terminal",
    "description": "Run commands in a persistent bash shell. State, including the current directory and exported environment variables, persists across calls for this agent.",
    "params": [
      "command"
    ],
    "source": "packages/shell/tool-bash-persistent/src/index.ts"
  },
  {
    "name": "str_replace_editor",
    "packageName": "@deepseek-ai/dsh-tool-str-replace-editor",
    "category": "File System",
    "description": "Custom editing tool for viewing, creating and editing files * State is persistent across command calls and discussions with the user * If `path` is a file, `view` displays the result of applying `cat -n`. If `path` is a directory, `view` lists non-hidden files and directories up to 2 levels deep * The `create` command cannot be used if the specified `path` already exists as a file * If a `command` generates a long output, it will be truncated and marked with `<response clipped>`",
    "params": [
      "command",
      "path",
      "file_text",
      "insert_line",
      "new_str",
      "old_str",
      "view_range"
    ],
    "source": "packages/fs/tool-str-replace-editor/src/index.ts"
  },
  {
    "name": "edit",
    "packageName": "@deepseek-ai/dsh-tool-fs",
    "category": "File System",
    "description": "Edit an existing UTF-8 text file by replacing literal text.",
    "params": [
      "file_path",
      "old_string",
      "new_string",
      "replace_all"
    ],
    "source": "packages/fs/tool-fs/src/index.ts"
  },
  {
    "name": "read",
    "packageName": "@deepseek-ai/dsh-tool-fs",
    "category": "File System",
    "description": "Read a UTF-8 text file and return line-numbered content.",
    "params": [
      "file_path",
      "offset",
      "limit"
    ],
    "source": "packages/fs/tool-fs/src/index.ts"
  },
  {
    "name": "read_image",
    "packageName": "@deepseek-ai/dsh-tool-fs",
    "category": "File System",
    "description": "Read a PNG/JPEG/WebP/GIF file and return the image itself. Requires the current model to accept image input.",
    "params": [
      "file_path"
    ],
    "source": "packages/fs/tool-fs/src/index.ts"
  },
  {
    "name": "write",
    "packageName": "@deepseek-ai/dsh-tool-fs",
    "category": "File System",
    "description": "Create or fully replace a UTF-8 text file.",
    "params": [
      "file_path",
      "content"
    ],
    "source": "packages/fs/tool-fs/src/index.ts"
  },
  {
    "name": "glob",
    "packageName": "@deepseek-ai/dsh-tool-fs-search",
    "category": "File System",
    "description": "Find files whose paths match a glob pattern. Returns matching file paths — never directories — including hidden and ignored files (VCS metadata directories are excluded). Up to 100 paths come back in modification-time order; a larger result instead returns 100 paths sampled across top-level entries, says so, and reports where the complete sorted list was saved. This tool does not enumerate directory entries.",
    "params": [
      "pattern",
      "path"
    ],
    "source": "packages/fs/tool-fs-search/src/index.ts"
  },
  {
    "name": "grep",
    "packageName": "@deepseek-ai/dsh-tool-fs-search",
    "category": "File System",
    "description": "Search file contents with a ripgrep regular expression. Returns matching lines with line numbers, grouped by file. Returns the first 250 matches inline; a capped result reports where the complete match list was saved. Use read on a matched file for surrounding context.",
    "params": [
      "pattern",
      "path",
      "include"
    ],
    "source": "packages/fs/tool-fs-search/src/index.ts"
  },
  {
    "name": "terminal_close",
    "packageName": "@deepseek-ai/dsh-tool-terminal",
    "category": "Shell & Terminal",
    "description": "Close one persistent terminal and wait until its captured owned process tree is gone.",
    "params": [
      "sessionId"
    ],
    "source": "packages/terminal/tool-terminal/src/index.ts"
  },
  {
    "name": "terminal_list",
    "packageName": "@deepseek-ai/dsh-tool-terminal",
    "category": "Shell & Terminal",
    "description": "List persistent terminal sessions owned by the current agent.",
    "params": [],
    "source": "packages/terminal/tool-terminal/src/index.ts"
  },
  {
    "name": "terminal_open",
    "packageName": "@deepseek-ai/dsh-tool-terminal",
    "category": "Shell & Terminal",
    "description": "Create a persistent, owner-isolated terminal session from a registered backend type. Use this for shell or REPL state that must survive across tool calls.",
    "params": [
      "type",
      "name",
      "cwd"
    ],
    "source": "packages/terminal/tool-terminal/src/index.ts"
  },
  {
    "name": "terminal_read",
    "packageName": "@deepseek-ai/dsh-tool-terminal",
    "category": "Shell & Terminal",
    "description": "Read a bounded page of retained output from a persistent terminal without sending input.",
    "params": [
      "sessionId",
      "offset",
      "count"
    ],
    "source": "packages/terminal/tool-terminal/src/index.ts"
  },
  {
    "name": "terminal_send",
    "packageName": "@deepseek-ai/dsh-tool-terminal",
    "category": "Shell & Terminal",
    "description": "Send text to a persistent terminal. By default Enter is submitted and the call waits for a prompt, stdin wait, output silence, timeout, or session exit. Background mode returns a job id for job_output/job_kill.",
    "params": [
      "sessionId",
      "text",
      "submit",
      "run_in_background"
    ],
    "source": "packages/terminal/tool-terminal/src/index.ts"
  },
  {
    "name": "terminal_signal",
    "packageName": "@deepseek-ai/dsh-tool-terminal",
    "category": "Shell & Terminal",
    "description": "Send an allowed signal to the current foreground process group of a persistent terminal.",
    "params": [
      "sessionId",
      "signal"
    ],
    "source": "packages/terminal/tool-terminal/src/index.ts"
  },
  {
    "name": "create_goal",
    "packageName": "@deepseek-ai/dsh-tool-goal",
    "category": "Goals & Schedule",
    "description": "Create one persisted same-session completion goal when the current direct human request is a long-running objective that should continue across autonomous goal rounds. You may infer that intent without requiring the user to say \"create a goal\". Do not use this for trivial single-turn work. Execution rejects non-human and subagent authority.",
    "params": [
      "objective",
      "max_goal_rounds"
    ],
    "source": "packages/goal/tool-goal/src/index.ts"
  },
  {
    "name": "get_goal",
    "packageName": "@deepseek-ai/dsh-tool-goal",
    "category": "Goals & Schedule",
    "description": "Read the current same-session goal, including its exact id/revision, objective, phase, completed continuation rounds, round limit, blocker reason when present, and whether another continuation is armed. Call this before updating a goal.",
    "params": [],
    "source": "packages/goal/tool-goal/src/index.ts"
  },
  {
    "name": "update_goal",
    "packageName": "@deepseek-ai/dsh-tool-goal",
    "category": "Goals & Schedule",
    "description": "Update the exact current goal revision. edit, pause, and resume require a direct top-level human request. During an automatic continuation of the current goal, complete and blocked are also allowed. blocked is rejected before the configured minimum round count; the model remains responsible for judging that the same condition persisted across those rounds and must explain it in blocked_reason.",
    "params": [
      "goal_id",
      "revision",
      "action",
      "objective",
      "max_goal_rounds",
      "blocked_reason"
    ],
    "source": "packages/goal/tool-goal/src/index.ts"
  },
  {
    "name": "schedule_create",
    "packageName": "@deepseek-ai/dsh-schedule",
    "category": "Goals & Schedule",
    "description": "Create one reminder in the current session. Supply a non-empty prompt and exactly one selector: a positive safe-integer after_seconds delay, at as a strict offset date-time or local date/time object, or safe-integer every_seconds of at least 300. Fixed-rate reminders stay creation-aligned, skip missed occurrences, and batch one latest occurrence per overdue rule. Delivery is session-local: the reminder runs on time only while this session is live and otherwise becomes overdue until the session is resumed.",
    "params": [
      "prompt",
      "after_seconds",
      "every_seconds",
      "at"
    ],
    "source": "packages/schedule/schedule/src/tools.ts"
  },
  {
    "name": "schedule_delete",
    "packageName": "@deepseek-ai/dsh-schedule",
    "category": "Goals & Schedule",
    "description": "Delete one active reminder in the current session by the exact id returned by schedule_create or schedule_list. Unknown or already-finished ids return deleted false.",
    "params": [
      "id"
    ],
    "source": "packages/schedule/schedule/src/tools.ts"
  },
  {
    "name": "schedule_list",
    "packageName": "@deepseek-ai/dsh-schedule",
    "category": "Goals & Schedule",
    "description": "List every active reminder in the current session in creation order, including its exact id, UTC target, scheduled or overdue state, and session-local delivery mode.",
    "params": [],
    "source": "packages/schedule/schedule/src/tools.ts"
  },
  {
    "name": "lsp",
    "packageName": "@deepseek-ai/dsh-tool-lsp",
    "category": "Search & Intelligence",
    "description": "Query a language server for precise code navigation. operation is one of goToDefinition, findReferences, goToImplementation, hover. line and character are one-based UTF-16 cursor coordinates. findReferences includes the declaration.",
    "params": [
      "operation",
      "file_path",
      "line",
      "character"
    ],
    "source": "packages/lsp/tool-lsp/src/index.ts"
  },
  {
    "name": "ralph",
    "packageName": "@deepseek-ai/dsh-tool-ralph",
    "category": "Planning & Workflow",
    "description": "Run a foreground fresh-agent Ralph loop toward one immutable objective. Use only when the direct human explicitly asks for Ralph or fresh-agent iteration. Each round opens a new child with no parent conversation or prior child session; the shared workspace is long-term memory, and only a bounded structured report crosses rounds. The call returns when a worker reports completion or a concrete blocker, or at the round limit. Ordinary long-running same-session work belongs to goal tools.",
    "params": [
      "objective",
      "maxRounds"
    ],
    "source": "packages/workflow/tool-ralph/src/index.ts"
  },
  {
    "name": "skill",
    "packageName": "@deepseek-ai/dsh-tool-skill",
    "category": "Search & Intelligence",
    "description": "Load the full instructions for an available skill. Call this with the exact skill name from the session skill catalog before acting on a task that names or clearly matches that skill.",
    "params": [
      "name"
    ],
    "source": "packages/skill/tool-skill/src/index.ts"
  },
  {
    "name": "session_event_read",
    "packageName": "@deepseek-ai/dsh-tool-session-query",
    "category": "Session & Jobs",
    "description": "Read one full unabridged event and optional neighboring raw-event summaries from an authorized session.",
    "params": [
      "session_id",
      "seq",
      "before",
      "after"
    ],
    "source": "packages/session-query/tool-session-query/src/index.ts"
  },
  {
    "name": "session_event_search",
    "packageName": "@deepseek-ai/dsh-tool-session-query",
    "category": "Session & Jobs",
    "description": "Search prior events in one authorized session; the current session excludes the step performing this call.",
    "params": [
      "session_id",
      "query",
      "seq_from",
      "seq_to",
      "time_from",
      "time_to",
      "event_types",
      "surfaces"
    ],
    "source": "packages/session-query/tool-session-query/src/index.ts"
  },
  {
    "name": "session_event_trace",
    "packageName": "@deepseek-ai/dsh-tool-session-query",
    "category": "Session & Jobs",
    "description": "Read every direct replacement and relationship to a cited source event for one event in an authorized session.",
    "params": [
      "session_id",
      "seq"
    ],
    "source": "packages/session-query/tool-session-query/src/index.ts"
  },
  {
    "name": "session_search",
    "packageName": "@deepseek-ai/dsh-tool-session-query",
    "category": "Session & Jobs",
    "description": "Search prior sessions in the caller workspace and return the strongest matching event from each session.",
    "params": [
      "query",
      "session_ids",
      "created_at_from",
      "created_at_to",
      "parent_session_ids",
      "include_root_sessions",
      "availability",
      "event_seq_from",
      "event_seq_to",
      "event_time_from",
      "event_time_to",
      "event_types",
      "event_surfaces"
    ],
    "source": "packages/session-query/tool-session-query/src/index.ts"
  },
  {
    "name": "session_trace",
    "packageName": "@deepseek-ai/dsh-tool-session-query",
    "category": "Session & Jobs",
    "description": "Read the authorized session lineage around one session, including complete visible ancestor and descendant relationships.",
    "params": [
      "session_id"
    ],
    "source": "packages/session-query/tool-session-query/src/index.ts"
  },
  {
    "name": "subagent",
    "packageName": "@deepseek-ai/dsh-tool-subagent",
    "category": "Agents",
    "description": "Delegate a self-contained task to a subagent (a separate agent that works in its own context) to offload focused, independent work — research, a scoped implementation, an analysis — so it does not consume this conversation's context. The subagent returns its result, not its intermediate steps. Give it a complete, standalone prompt: it does not see this conversation. This call waits for the result by default. Set `run_in_background: true` to return a job id; collect with `job_output` and stop with `job_kill`.",
    "params": [
      "description",
      "prompt",
      "run_in_background"
    ],
    "source": "packages/subagent/tool-subagent/src/index.ts"
  },
  {
    "name": "interrupt_agent",
    "packageName": "@deepseek-ai/dsh-tool-subagent-control",
    "category": "Agents",
    "description": "Request cancellation of a background agent's current turn by its agent id. The target may be your direct child or a deeper agent created under you. Only the current turn stops: messages already queued for the agent stay parked until a later send_message, agents it started keep running, and the agent itself stays available for follow-ups. This call returns as soon as the stop request is accepted, so the target may keep running briefly; interrupting an agent that already finished is an accepted no-op.",
    "params": [
      "agent_id"
    ],
    "source": "packages/subagent/tool-subagent-control/src/index.ts"
  },
  {
    "name": "list_agents",
    "packageName": "@deepseek-ai/dsh-tool-subagent-control",
    "category": "Agents",
    "description": "List your continuable background subagents by durable id and label. Use it to recall which ones you started, not to poll for completion — you are told when one finishes. Status comes from the live registry: running means the agent is working right now, idle means it is loaded but between turns (it may be waiting on agents it started), and ready means it exists only in storage — resumable, not terminal, and not a result waiting to be collected; a `send_message` starts a new turn on the same conversation, and a direct child remains a `send_message` candidate in every status. The snapshot is not a delivery promise — `send_message` performs the authoritative check and may still fail. Children that could not be read are reported as diagnostics instead of being silently dropped. Scope `descendants` walks the whole tree below you in stable pre-order, annotating each entry with its durable direct-parent session id and depth. You may use `send_message` only for depth-1 entries; deeper entries are candidates for `interrupt_agent` only.",
    "params": [
      "scope"
    ],
    "source": "packages/subagent/tool-subagent-control/src/list-agents.ts"
  },
  {
    "name": "send_message",
    "packageName": "@deepseek-ai/dsh-tool-subagent-control",
    "category": "Agents",
    "description": "Send a message to a background subagent by its subagent id, continuing the same conversation. It becomes the subagent's next turn: if it is still working, the message waits until its current turn finishes, so it cannot redirect work already underway. This call returns no answer from the subagent — only confirmation that the message was delivered — so use it to give it more work. A failure means the message was NOT delivered.",
    "params": [
      "subagent_id",
      "message"
    ],
    "source": "packages/subagent/tool-subagent-control/src/index.ts"
  },
  {
    "name": "report",
    "packageName": "@deepseek-ai/dsh-tool-subagent-report",
    "category": "Agents",
    "description": "Report selected content to the agent that started you. Call this once before you finish, with a self-contained final result, and earlier for progress or findings that change what that agent does next. That agent shares your workspace but does not automatically receive your transcript, tool output, or reasoning, so finishing your work is not itself a result. Reporting does not end your turn or finish your work, and only your direct parent receives it. A failed call may still have arrived, so do not blindly repeat it.",
    "params": [
      "output"
    ],
    "source": "packages/subagent/tool-subagent-report/src/index.ts"
  },
  {
    "name": "job_kill",
    "packageName": "@deepseek-ai/dsh-tool-jobs",
    "category": "Session & Jobs",
    "description": "Request cancellation of a running background job by job id. Returns immediately; the job settles as killed once its work actually stops.",
    "params": [
      "job_id",
      "reason"
    ],
    "source": "packages/jobs/tool-jobs/src/index.ts"
  },
  {
    "name": "job_list",
    "packageName": "@deepseek-ai/dsh-tool-jobs",
    "category": "Session & Jobs",
    "description": "List your background jobs (running and finished) with their ids, kinds, and statuses.",
    "params": [],
    "source": "packages/jobs/tool-jobs/src/index.ts"
  },
  {
    "name": "job_output",
    "packageName": "@deepseek-ai/dsh-tool-jobs",
    "category": "Session & Jobs",
    "description": "Read a background job. Stream jobs return only output since the previous read; final-output jobs return their result after settlement. Every response ends with `[status: ...]`. Reads are non-blocking unless `wait: true`, which waits up to the configured cap.",
    "params": [
      "job_id",
      "wait",
      "timeout_ms"
    ],
    "source": "packages/jobs/tool-jobs/src/index.ts"
  },
  {
    "name": "todo_write",
    "packageName": "@deepseek-ai/dsh-tool-todo",
    "category": "Planning & Workflow",
    "description": "Record and update a structured task list for the current work. Send the ENTIRE list every call — it REPLACES the previous list (there are no partial updates, no per-item edits). Use it to plan multi-step work and show progress: add one todo per concrete step before you start. Mark every todo being actively worked on `in_progress` — several at once when work genuinely runs in parallel (e.g. concurrent subagents or background commands), one for sequential work; while work remains, at least one task should be `in_progress`. Mark a todo `completed` the moment it is done (do not batch completions), and allow no `in_progress` item only once all work is complete. Skip the list for trivial single-step tasks. Statuses: `pending` (not started), `in_progress` (being worked on now), `completed` (finished).",
    "params": [
      "todos"
    ],
    "source": "packages/todo/tool-todo/src/index.ts"
  },
  {
    "name": "workflow",
    "packageName": "@deepseek-ai/dsh-tool-workflow",
    "category": "Planning & Workflow",
    "description": "Run a JavaScript workflow script that orchestrates subagents at scale. Use this for work that fans out across many independent pieces — an audit over many files, a migration, multi-angle research, adversarial verification of findings — where you write the orchestration as a script instead of delegating turn by turn.",
    "params": [
      "script",
      "meta",
      "args"
    ],
    "source": "packages/workflow/tool-workflow/src/index.ts"
  },
  {
    "name": "web_fetch",
    "packageName": "@deepseek-ai/dsh-tool-web",
    "category": "Search & Intelligence",
    "description": "Fetch the content of a specific HTTP(S) URL and return it decoded to text.",
    "params": [
      "url"
    ],
    "source": "packages/web/tool-web/src/index.ts"
  },
  {
    "name": "web_search",
    "packageName": "@deepseek-ai/dsh-tool-web",
    "category": "Search & Intelligence",
    "description": "Search the web for current information. Returns an optional summary answer and a list of source URLs.",
    "params": [
      "query"
    ],
    "source": "packages/web/tool-web/src/index.ts"
  }
];

export const architectureCatalog = [
  {
    "group": "acp",
    "count": 1,
    "files": 3,
    "packages": [
      {
        "name": "acp",
        "files": 3,
        "path": "packages/acp/acp"
      }
    ]
  },
  {
    "group": "api",
    "count": 2,
    "files": 10,
    "packages": [
      {
        "name": "gateway",
        "files": 4,
        "path": "packages/api/gateway"
      },
      {
        "name": "remotes",
        "files": 6,
        "path": "packages/api/remotes"
      }
    ]
  },
  {
    "group": "attachment",
    "count": 2,
    "files": 9,
    "packages": [
      {
        "name": "attachment",
        "files": 5,
        "path": "packages/attachment/attachment"
      },
      {
        "name": "attachment-local",
        "files": 4,
        "path": "packages/attachment/attachment-local"
      }
    ]
  },
  {
    "group": "boot",
    "count": 2,
    "files": 5,
    "packages": [
      {
        "name": "app-boot",
        "files": 3,
        "path": "packages/boot/app-boot"
      },
      {
        "name": "cmdline",
        "files": 2,
        "path": "packages/boot/cmdline"
      }
    ]
  },
  {
    "group": "bundle",
    "count": 3,
    "files": 8,
    "packages": [
      {
        "name": "base",
        "files": 2,
        "path": "packages/bundle/base"
      },
      {
        "name": "headless",
        "files": 3,
        "path": "packages/bundle/headless"
      },
      {
        "name": "web-app",
        "files": 3,
        "path": "packages/bundle/web-app"
      }
    ]
  },
  {
    "group": "client",
    "count": 39,
    "files": 608,
    "packages": [
      {
        "name": "connection",
        "files": 16,
        "path": "packages/client/connection"
      },
      {
        "name": "hmr",
        "files": 4,
        "path": "packages/client/hmr"
      },
      {
        "name": "locale",
        "files": 12,
        "path": "packages/client/locale"
      },
      {
        "name": "modules",
        "files": 5,
        "path": "packages/client/modules"
      },
      {
        "name": "runtime",
        "files": 44,
        "path": "packages/client/runtime"
      },
      {
        "name": "schema-form",
        "files": 3,
        "path": "packages/client/schema-form"
      },
      {
        "name": "ui-agent-preset",
        "files": 17,
        "path": "packages/client/ui-agent-preset"
      },
      {
        "name": "ui-attachment",
        "files": 11,
        "path": "packages/client/ui-attachment"
      },
      {
        "name": "ui-commands",
        "files": 11,
        "path": "packages/client/ui-commands"
      },
      {
        "name": "ui-conversation",
        "files": 91,
        "path": "packages/client/ui-conversation"
      },
      {
        "name": "ui-deliverables",
        "files": 8,
        "path": "packages/client/ui-deliverables"
      },
      {
        "name": "ui-directory-picker-browse",
        "files": 7,
        "path": "packages/client/ui-directory-picker-browse"
      },
      {
        "name": "ui-directory-picker-native",
        "files": 4,
        "path": "packages/client/ui-directory-picker-native"
      },
      {
        "name": "ui-goal",
        "files": 11,
        "path": "packages/client/ui-goal"
      },
      {
        "name": "ui-input-trigger",
        "files": 15,
        "path": "packages/client/ui-input-trigger"
      },
      {
        "name": "ui-jobs",
        "files": 7,
        "path": "packages/client/ui-jobs"
      },
      {
        "name": "ui-layout",
        "files": 10,
        "path": "packages/client/ui-layout"
      },
      {
        "name": "ui-message-feedback",
        "files": 9,
        "path": "packages/client/ui-message-feedback"
      },
      {
        "name": "ui-model-selection",
        "files": 10,
        "path": "packages/client/ui-model-selection"
      },
      {
        "name": "ui-permission-presets",
        "files": 9,
        "path": "packages/client/ui-permission-presets"
      },
      {
        "name": "ui-plan",
        "files": 7,
        "path": "packages/client/ui-plan"
      },
      {
        "name": "ui-primitives",
        "files": 67,
        "path": "packages/client/ui-primitives"
      },
      {
        "name": "ui-settings",
        "files": 6,
        "path": "packages/client/ui-settings"
      },
      {
        "name": "ui-settings-general",
        "files": 15,
        "path": "packages/client/ui-settings-general"
      },
      {
        "name": "ui-settings-models",
        "files": 22,
        "path": "packages/client/ui-settings-models"
      },
      {
        "name": "ui-settings-plugin-inventory",
        "files": 7,
        "path": "packages/client/ui-settings-plugin-inventory"
      },
      {
        "name": "ui-settings-plugins",
        "files": 20,
        "path": "packages/client/ui-settings-plugins"
      },
      {
        "name": "ui-sidebar",
        "files": 8,
        "path": "packages/client/ui-sidebar"
      },
      {
        "name": "ui-skill",
        "files": 7,
        "path": "packages/client/ui-skill"
      },
      {
        "name": "ui-slots",
        "files": 4,
        "path": "packages/client/ui-slots"
      },
      {
        "name": "ui-subagent",
        "files": 9,
        "path": "packages/client/ui-subagent"
      },
      {
        "name": "ui-theme",
        "files": 15,
        "path": "packages/client/ui-theme"
      },
      {
        "name": "ui-tool",
        "files": 29,
        "path": "packages/client/ui-tool"
      },
      {
        "name": "ui-trajectory",
        "files": 36,
        "path": "packages/client/ui-trajectory"
      },
      {
        "name": "ui-user-questions",
        "files": 10,
        "path": "packages/client/ui-user-questions"
      },
      {
        "name": "ui-workflow-run",
        "files": 8,
        "path": "packages/client/ui-workflow-run"
      },
      {
        "name": "ui-workspace",
        "files": 14,
        "path": "packages/client/ui-workspace"
      },
      {
        "name": "web",
        "files": 13,
        "path": "packages/client/web"
      },
      {
        "name": "web-react",
        "files": 7,
        "path": "packages/client/web-react"
      }
    ]
  },
  {
    "group": "code-runtime",
    "count": 2,
    "files": 10,
    "packages": [
      {
        "name": "code-runtime",
        "files": 3,
        "path": "packages/code-runtime/code-runtime"
      },
      {
        "name": "code-runtime-worker-thread",
        "files": 7,
        "path": "packages/code-runtime/code-runtime-worker-thread"
      }
    ]
  },
  {
    "group": "compaction",
    "count": 4,
    "files": 18,
    "packages": [
      {
        "name": "command-compact",
        "files": 2,
        "path": "packages/compaction/command-compact"
      },
      {
        "name": "compaction",
        "files": 6,
        "path": "packages/compaction/compaction"
      },
      {
        "name": "compaction-basic",
        "files": 6,
        "path": "packages/compaction/compaction-basic"
      },
      {
        "name": "compaction-tool-result-pruner",
        "files": 4,
        "path": "packages/compaction/compaction-tool-result-pruner"
      }
    ]
  },
  {
    "group": "context",
    "count": 4,
    "files": 20,
    "packages": [
      {
        "name": "agent-instructions",
        "files": 7,
        "path": "packages/context/agent-instructions"
      },
      {
        "name": "session-reference",
        "files": 7,
        "path": "packages/context/session-reference"
      },
      {
        "name": "time-context",
        "files": 4,
        "path": "packages/context/time-context"
      },
      {
        "name": "tmux-context",
        "files": 2,
        "path": "packages/context/tmux-context"
      }
    ]
  },
  {
    "group": "core",
    "count": 8,
    "files": 44,
    "packages": [
      {
        "name": "agent",
        "files": 8,
        "path": "packages/core/agent"
      },
      {
        "name": "agent-default-model",
        "files": 2,
        "path": "packages/core/agent-default-model"
      },
      {
        "name": "agent-loop",
        "files": 6,
        "path": "packages/core/agent-loop"
      },
      {
        "name": "agent-tool-presentation",
        "files": 2,
        "path": "packages/core/agent-tool-presentation"
      },
      {
        "name": "scope",
        "files": 4,
        "path": "packages/core/scope"
      },
      {
        "name": "session",
        "files": 10,
        "path": "packages/core/session"
      },
      {
        "name": "system-prompt",
        "files": 2,
        "path": "packages/core/system-prompt"
      },
      {
        "name": "tools",
        "files": 10,
        "path": "packages/core/tools"
      }
    ]
  },
  {
    "group": "credentials",
    "count": 2,
    "files": 5,
    "packages": [
      {
        "name": "credentials",
        "files": 3,
        "path": "packages/credentials/credentials"
      },
      {
        "name": "credentials-local",
        "files": 2,
        "path": "packages/credentials/credentials-local"
      }
    ]
  },
  {
    "group": "e2b",
    "count": 3,
    "files": 11,
    "packages": [
      {
        "name": "e2b",
        "files": 2,
        "path": "packages/e2b/e2b"
      },
      {
        "name": "fs-e2b",
        "files": 2,
        "path": "packages/e2b/fs-e2b"
      },
      {
        "name": "subprocess-e2b",
        "files": 7,
        "path": "packages/e2b/subprocess-e2b"
      }
    ]
  },
  {
    "group": "examples",
    "count": 3,
    "files": 10,
    "packages": [
      {
        "name": "acp-demo",
        "files": 3,
        "path": "packages/examples/acp-demo"
      },
      {
        "name": "agent-spine-demo",
        "files": 2,
        "path": "packages/examples/agent-spine-demo"
      },
      {
        "name": "jsonrpc-demo",
        "files": 5,
        "path": "packages/examples/jsonrpc-demo"
      }
    ]
  },
  {
    "group": "extensions",
    "count": 4,
    "files": 47,
    "packages": [
      {
        "name": "cordis-client-runner",
        "files": 12,
        "path": "packages/extensions/cordis-client-runner"
      },
      {
        "name": "cordis-host-runner",
        "files": 8,
        "path": "packages/extensions/cordis-host-runner"
      },
      {
        "name": "tool-cordis",
        "files": 8,
        "path": "packages/extensions/tool-cordis"
      },
      {
        "name": "ui-cordis",
        "files": 19,
        "path": "packages/extensions/ui-cordis"
      }
    ]
  },
  {
    "group": "feedback",
    "count": 2,
    "files": 6,
    "packages": [
      {
        "name": "command-feedback",
        "files": 2,
        "path": "packages/feedback/command-feedback"
      },
      {
        "name": "message-feedback",
        "files": 4,
        "path": "packages/feedback/message-feedback"
      }
    ]
  },
  {
    "group": "fs",
    "count": 7,
    "files": 35,
    "packages": [
      {
        "name": "fs",
        "files": 3,
        "path": "packages/fs/fs"
      },
      {
        "name": "fs-local",
        "files": 4,
        "path": "packages/fs/fs-local"
      },
      {
        "name": "fs-observation-policy",
        "files": 3,
        "path": "packages/fs/fs-observation-policy"
      },
      {
        "name": "fs-sandbox",
        "files": 3,
        "path": "packages/fs/fs-sandbox"
      },
      {
        "name": "tool-fs",
        "files": 12,
        "path": "packages/fs/tool-fs"
      },
      {
        "name": "tool-fs-search",
        "files": 8,
        "path": "packages/fs/tool-fs-search"
      },
      {
        "name": "tool-str-replace-editor",
        "files": 2,
        "path": "packages/fs/tool-str-replace-editor"
      }
    ]
  },
  {
    "group": "goal",
    "count": 4,
    "files": 16,
    "packages": [
      {
        "name": "command-goal",
        "files": 2,
        "path": "packages/goal/command-goal"
      },
      {
        "name": "goal",
        "files": 7,
        "path": "packages/goal/goal"
      },
      {
        "name": "goal-round-driver",
        "files": 3,
        "path": "packages/goal/goal-round-driver"
      },
      {
        "name": "tool-goal",
        "files": 4,
        "path": "packages/goal/tool-goal"
      }
    ]
  },
  {
    "group": "guard",
    "count": 2,
    "files": 4,
    "packages": [
      {
        "name": "repeat-tool-reminder",
        "files": 2,
        "path": "packages/guard/repeat-tool-reminder"
      },
      {
        "name": "timeout-policy",
        "files": 2,
        "path": "packages/guard/timeout-policy"
      }
    ]
  },
  {
    "group": "hooks",
    "count": 3,
    "files": 15,
    "packages": [
      {
        "name": "hook-protocol",
        "files": 9,
        "path": "packages/hooks/hook-protocol"
      },
      {
        "name": "hooks-claude-code",
        "files": 3,
        "path": "packages/hooks/hooks-claude-code"
      },
      {
        "name": "hooks-codex",
        "files": 3,
        "path": "packages/hooks/hooks-codex"
      }
    ]
  },
  {
    "group": "host",
    "count": 8,
    "files": 65,
    "packages": [
      {
        "name": "apiproxy",
        "files": 42,
        "path": "packages/host/apiproxy"
      },
      {
        "name": "directory-picker",
        "files": 2,
        "path": "packages/host/directory-picker"
      },
      {
        "name": "directory-picker-auto",
        "files": 4,
        "path": "packages/host/directory-picker-auto"
      },
      {
        "name": "directory-picker-browse",
        "files": 2,
        "path": "packages/host/directory-picker-browse"
      },
      {
        "name": "directory-picker-native",
        "files": 8,
        "path": "packages/host/directory-picker-native"
      },
      {
        "name": "frontend-static",
        "files": 2,
        "path": "packages/host/frontend-static"
      },
      {
        "name": "plugin-inventory",
        "files": 3,
        "path": "packages/host/plugin-inventory"
      },
      {
        "name": "webserver",
        "files": 2,
        "path": "packages/host/webserver"
      }
    ]
  },
  {
    "group": "identity",
    "count": 1,
    "files": 2,
    "packages": [
      {
        "name": "anonymous-user-id",
        "files": 2,
        "path": "packages/identity/anonymous-user-id"
      }
    ]
  },
  {
    "group": "interaction",
    "count": 5,
    "files": 16,
    "packages": [
      {
        "name": "commands",
        "files": 4,
        "path": "packages/interaction/commands"
      },
      {
        "name": "permission-presets",
        "files": 4,
        "path": "packages/interaction/permission-presets"
      },
      {
        "name": "tool-ask-user",
        "files": 2,
        "path": "packages/interaction/tool-ask-user"
      },
      {
        "name": "user-approval",
        "files": 3,
        "path": "packages/interaction/user-approval"
      },
      {
        "name": "user-questions",
        "files": 3,
        "path": "packages/interaction/user-questions"
      }
    ]
  },
  {
    "group": "jobs",
    "count": 3,
    "files": 8,
    "packages": [
      {
        "name": "jobs",
        "files": 4,
        "path": "packages/jobs/jobs"
      },
      {
        "name": "jobs-local",
        "files": 2,
        "path": "packages/jobs/jobs-local"
      },
      {
        "name": "tool-jobs",
        "files": 2,
        "path": "packages/jobs/tool-jobs"
      }
    ]
  },
  {
    "group": "llm",
    "count": 5,
    "files": 46,
    "packages": [
      {
        "name": "llm",
        "files": 14,
        "path": "packages/llm/llm"
      },
      {
        "name": "llm-deepseek",
        "files": 7,
        "path": "packages/llm/llm-deepseek"
      },
      {
        "name": "llm-pi-ai",
        "files": 10,
        "path": "packages/llm/llm-pi-ai"
      },
      {
        "name": "llm-retry",
        "files": 5,
        "path": "packages/llm/llm-retry"
      },
      {
        "name": "token-meter",
        "files": 10,
        "path": "packages/llm/token-meter"
      }
    ]
  },
  {
    "group": "lsp",
    "count": 3,
    "files": 17,
    "packages": [
      {
        "name": "lsp",
        "files": 4,
        "path": "packages/lsp/lsp"
      },
      {
        "name": "lsp-stdio",
        "files": 9,
        "path": "packages/lsp/lsp-stdio"
      },
      {
        "name": "tool-lsp",
        "files": 4,
        "path": "packages/lsp/tool-lsp"
      }
    ]
  },
  {
    "group": "mcp",
    "count": 1,
    "files": 5,
    "packages": [
      {
        "name": "mcp-client",
        "files": 5,
        "path": "packages/mcp/mcp-client"
      }
    ]
  },
  {
    "group": "plan",
    "count": 1,
    "files": 4,
    "packages": [
      {
        "name": "plan-mode",
        "files": 4,
        "path": "packages/plan/plan-mode"
      }
    ]
  },
  {
    "group": "preset",
    "count": 2,
    "files": 11,
    "packages": [
      {
        "name": "agent-presets",
        "files": 9,
        "path": "packages/preset/agent-presets"
      },
      {
        "name": "persona",
        "files": 2,
        "path": "packages/preset/persona"
      }
    ]
  },
  {
    "group": "runtime-diagnostics",
    "count": 1,
    "files": 2,
    "packages": [
      {
        "name": "invariants",
        "files": 2,
        "path": "packages/runtime-diagnostics/invariants"
      }
    ]
  },
  {
    "group": "sandbox",
    "count": 4,
    "files": 22,
    "packages": [
      {
        "name": "sandbox",
        "files": 4,
        "path": "packages/sandbox/sandbox"
      },
      {
        "name": "sandbox-local",
        "files": 3,
        "path": "packages/sandbox/sandbox-local"
      },
      {
        "name": "sandbox-policy",
        "files": 3,
        "path": "packages/sandbox/sandbox-policy"
      },
      {
        "name": "sandbox-windows-acl",
        "files": 12,
        "path": "packages/sandbox/sandbox-windows-acl"
      }
    ]
  },
  {
    "group": "schedule",
    "count": 1,
    "files": 8,
    "packages": [
      {
        "name": "schedule",
        "files": 8,
        "path": "packages/schedule/schedule"
      }
    ]
  },
  {
    "group": "sdk",
    "count": 3,
    "files": 13,
    "packages": [
      {
        "name": "client",
        "files": 6,
        "path": "packages/sdk/client"
      },
      {
        "name": "protocol",
        "files": 4,
        "path": "packages/sdk/protocol"
      },
      {
        "name": "server",
        "files": 3,
        "path": "packages/sdk/server"
      }
    ]
  },
  {
    "group": "session",
    "count": 13,
    "files": 45,
    "packages": [
      {
        "name": "session-checkpoint-policy",
        "files": 2,
        "path": "packages/session/session-checkpoint-policy"
      },
      {
        "name": "session-persistence",
        "files": 6,
        "path": "packages/session/session-persistence"
      },
      {
        "name": "session-persistence-jsonl",
        "files": 7,
        "path": "packages/session/session-persistence-jsonl"
      },
      {
        "name": "session-persistence-sqlite",
        "files": 3,
        "path": "packages/session/session-persistence-sqlite"
      },
      {
        "name": "session-projection",
        "files": 3,
        "path": "packages/session/session-projection"
      },
      {
        "name": "session-projection-cache",
        "files": 3,
        "path": "packages/session/session-projection-cache"
      },
      {
        "name": "session-stats",
        "files": 5,
        "path": "packages/session/session-stats"
      },
      {
        "name": "session-telemetry",
        "files": 3,
        "path": "packages/session/session-telemetry"
      },
      {
        "name": "session-telemetry-otel",
        "files": 2,
        "path": "packages/session/session-telemetry-otel"
      },
      {
        "name": "session-title",
        "files": 5,
        "path": "packages/session/session-title"
      },
      {
        "name": "session-title-all-prompts-llm",
        "files": 2,
        "path": "packages/session/session-title-all-prompts-llm"
      },
      {
        "name": "session-title-first-prompt-llm",
        "files": 2,
        "path": "packages/session/session-title-first-prompt-llm"
      },
      {
        "name": "session-title-llm",
        "files": 2,
        "path": "packages/session/session-title-llm"
      }
    ]
  },
  {
    "group": "session-query",
    "count": 4,
    "files": 31,
    "packages": [
      {
        "name": "session-log-export",
        "files": 9,
        "path": "packages/session-query/session-log-export"
      },
      {
        "name": "session-query",
        "files": 11,
        "path": "packages/session-query/session-query"
      },
      {
        "name": "session-query-sqlite",
        "files": 4,
        "path": "packages/session-query/session-query-sqlite"
      },
      {
        "name": "tool-session-query",
        "files": 7,
        "path": "packages/session-query/tool-session-query"
      }
    ]
  },
  {
    "group": "settings",
    "count": 2,
    "files": 6,
    "packages": [
      {
        "name": "settings",
        "files": 4,
        "path": "packages/settings/settings"
      },
      {
        "name": "settings-file",
        "files": 2,
        "path": "packages/settings/settings-file"
      }
    ]
  },
  {
    "group": "shell",
    "count": 9,
    "files": 27,
    "packages": [
      {
        "name": "bash-local",
        "files": 2,
        "path": "packages/shell/bash-local"
      },
      {
        "name": "bash-sandbox",
        "files": 3,
        "path": "packages/shell/bash-sandbox"
      },
      {
        "name": "pwsh-local",
        "files": 3,
        "path": "packages/shell/pwsh-local"
      },
      {
        "name": "pwsh-sandbox",
        "files": 3,
        "path": "packages/shell/pwsh-sandbox"
      },
      {
        "name": "shell",
        "files": 4,
        "path": "packages/shell/shell"
      },
      {
        "name": "shell-env",
        "files": 2,
        "path": "packages/shell/shell-env"
      },
      {
        "name": "tool-bash",
        "files": 4,
        "path": "packages/shell/tool-bash"
      },
      {
        "name": "tool-bash-persistent",
        "files": 2,
        "path": "packages/shell/tool-bash-persistent"
      },
      {
        "name": "tool-pwsh",
        "files": 4,
        "path": "packages/shell/tool-pwsh"
      }
    ]
  },
  {
    "group": "skill",
    "count": 4,
    "files": 8,
    "packages": [
      {
        "name": "skill",
        "files": 2,
        "path": "packages/skill/skill"
      },
      {
        "name": "skill-badge",
        "files": 2,
        "path": "packages/skill/skill-badge"
      },
      {
        "name": "skill-filesystem",
        "files": 2,
        "path": "packages/skill/skill-filesystem"
      },
      {
        "name": "tool-skill",
        "files": 2,
        "path": "packages/skill/tool-skill"
      }
    ]
  },
  {
    "group": "spill",
    "count": 3,
    "files": 9,
    "packages": [
      {
        "name": "spill",
        "files": 3,
        "path": "packages/spill/spill"
      },
      {
        "name": "spill-local",
        "files": 3,
        "path": "packages/spill/spill-local"
      },
      {
        "name": "spill-policy",
        "files": 3,
        "path": "packages/spill/spill-policy"
      }
    ]
  },
  {
    "group": "storage",
    "count": 4,
    "files": 20,
    "packages": [
      {
        "name": "storage",
        "files": 5,
        "path": "packages/storage/storage"
      },
      {
        "name": "storage-domain",
        "files": 6,
        "path": "packages/storage/storage-domain"
      },
      {
        "name": "storage-json",
        "files": 5,
        "path": "packages/storage/storage-json"
      },
      {
        "name": "storage-sqlite",
        "files": 4,
        "path": "packages/storage/storage-sqlite"
      }
    ]
  },
  {
    "group": "subagent",
    "count": 11,
    "files": 46,
    "packages": [
      {
        "name": "subagent",
        "files": 18,
        "path": "packages/subagent/subagent"
      },
      {
        "name": "subagent-acp",
        "files": 3,
        "path": "packages/subagent/subagent-acp"
      },
      {
        "name": "subagent-claude-code",
        "files": 4,
        "path": "packages/subagent/subagent-claude-code"
      },
      {
        "name": "subagent-codex",
        "files": 4,
        "path": "packages/subagent/subagent-codex"
      },
      {
        "name": "subagent-dsh-sdk",
        "files": 3,
        "path": "packages/subagent/subagent-dsh-sdk"
      },
      {
        "name": "subagent-fork-in-process",
        "files": 2,
        "path": "packages/subagent/subagent-fork-in-process"
      },
      {
        "name": "subagent-in-process-driver",
        "files": 3,
        "path": "packages/subagent/subagent-in-process-driver"
      },
      {
        "name": "subagent-spawn-in-process",
        "files": 2,
        "path": "packages/subagent/subagent-spawn-in-process"
      },
      {
        "name": "tool-subagent",
        "files": 2,
        "path": "packages/subagent/tool-subagent"
      },
      {
        "name": "tool-subagent-control",
        "files": 3,
        "path": "packages/subagent/tool-subagent-control"
      },
      {
        "name": "tool-subagent-report",
        "files": 2,
        "path": "packages/subagent/tool-subagent-report"
      }
    ]
  },
  {
    "group": "subprocess",
    "count": 2,
    "files": 8,
    "packages": [
      {
        "name": "subprocess",
        "files": 3,
        "path": "packages/subprocess/subprocess"
      },
      {
        "name": "subprocess-local",
        "files": 5,
        "path": "packages/subprocess/subprocess-local"
      }
    ]
  },
  {
    "group": "terminal",
    "count": 3,
    "files": 11,
    "packages": [
      {
        "name": "terminal",
        "files": 3,
        "path": "packages/terminal/terminal"
      },
      {
        "name": "terminal-bash",
        "files": 5,
        "path": "packages/terminal/terminal-bash"
      },
      {
        "name": "tool-terminal",
        "files": 3,
        "path": "packages/terminal/tool-terminal"
      }
    ]
  },
  {
    "group": "test-support",
    "count": 6,
    "files": 27,
    "packages": [
      {
        "name": "acp-snapshot",
        "files": 6,
        "path": "packages/test-support/acp-snapshot"
      },
      {
        "name": "agent-loop-testkit",
        "files": 2,
        "path": "packages/test-support/agent-loop-testkit"
      },
      {
        "name": "client-runtime",
        "files": 10,
        "path": "packages/test-support/client-runtime"
      },
      {
        "name": "llm-mock-server",
        "files": 4,
        "path": "packages/test-support/llm-mock-server"
      },
      {
        "name": "llm-replay",
        "files": 2,
        "path": "packages/test-support/llm-replay"
      },
      {
        "name": "loader-smoke",
        "files": 3,
        "path": "packages/test-support/loader-smoke"
      }
    ]
  },
  {
    "group": "todo",
    "count": 1,
    "files": 4,
    "packages": [
      {
        "name": "tool-todo",
        "files": 4,
        "path": "packages/todo/tool-todo"
      }
    ]
  },
  {
    "group": "typert",
    "count": 4,
    "files": 19,
    "packages": [
      {
        "name": "generator",
        "files": 9,
        "path": "packages/typert/generator"
      },
      {
        "name": "loader",
        "files": 2,
        "path": "packages/typert/loader"
      },
      {
        "name": "protocol",
        "files": 3,
        "path": "packages/typert/protocol"
      },
      {
        "name": "registry",
        "files": 5,
        "path": "packages/typert/registry"
      }
    ]
  },
  {
    "group": "util",
    "count": 7,
    "files": 14,
    "packages": [
      {
        "name": "atomic-write",
        "files": 2,
        "path": "packages/util/atomic-write"
      },
      {
        "name": "brand",
        "files": 2,
        "path": "packages/util/brand"
      },
      {
        "name": "home-paths",
        "files": 2,
        "path": "packages/util/home-paths"
      },
      {
        "name": "launch-environment",
        "files": 2,
        "path": "packages/util/launch-environment"
      },
      {
        "name": "native-command",
        "files": 2,
        "path": "packages/util/native-command"
      },
      {
        "name": "output-retention",
        "files": 2,
        "path": "packages/util/output-retention"
      },
      {
        "name": "timeout",
        "files": 2,
        "path": "packages/util/timeout"
      }
    ]
  },
  {
    "group": "web",
    "count": 6,
    "files": 24,
    "packages": [
      {
        "name": "tool-web",
        "files": 5,
        "path": "packages/web/tool-web"
      },
      {
        "name": "web",
        "files": 3,
        "path": "packages/web/web"
      },
      {
        "name": "web-fetch-http",
        "files": 4,
        "path": "packages/web/web-fetch-http"
      },
      {
        "name": "web-search-deepseek",
        "files": 4,
        "path": "packages/web/web-search-deepseek"
      },
      {
        "name": "web-search-exa",
        "files": 4,
        "path": "packages/web/web-search-exa"
      },
      {
        "name": "web-search-perplexity",
        "files": 4,
        "path": "packages/web/web-search-perplexity"
      }
    ]
  },
  {
    "group": "workflow",
    "count": 4,
    "files": 19,
    "packages": [
      {
        "name": "tool-ralph",
        "files": 2,
        "path": "packages/workflow/tool-ralph"
      },
      {
        "name": "tool-workflow",
        "files": 3,
        "path": "packages/workflow/tool-workflow"
      },
      {
        "name": "workflow",
        "files": 4,
        "path": "packages/workflow/workflow"
      },
      {
        "name": "workflow-worker-thread",
        "files": 10,
        "path": "packages/workflow/workflow-worker-thread"
      }
    ]
  },
  {
    "group": "workspace",
    "count": 1,
    "files": 6,
    "packages": [
      {
        "name": "workspace",
        "files": 6,
        "path": "packages/workspace/workspace"
      }
    ]
  }
];

export const commandCatalog = [
  {
    "name": "/feedback",
    "category": "Session",
    "input": "<text>",
    "description": "Record feedback about the current session.",
    "source": "packages/feedback/command-feedback/src/index.ts"
  },
  {
    "name": "/goal",
    "category": "Agent Control",
    "input": "[<objective>|clear|edit <objective>|pause|resume]",
    "description": "Set, inspect, edit, pause, resume, or clear a long-running goal.",
    "source": "packages/goal/command-goal/src/index.ts"
  },
  {
    "name": "/plan",
    "category": "Agent Control",
    "input": "[off|message]",
    "description": "Enter plan mode, leave it, or enter with an initial planning message.",
    "source": "packages/plan/plan-mode/src/index.ts"
  },
  {
    "name": "/permission",
    "category": "Configuration",
    "input": "<preset>",
    "description": "Switch the sandbox mode and approval-policy preset.",
    "source": "packages/interaction/permission-presets/src/index.ts"
  },
  {
    "name": "/compact",
    "category": "Session",
    "input": "",
    "description": "Compact older conversation history on demand.",
    "source": "packages/compaction/command-compact/src/index.ts"
  },
  {
    "name": "/export",
    "category": "Session",
    "input": "",
    "description": "Download the current Session log as a ZIP archive in the Web client.",
    "source": "packages/session-query/session-log-export/src/index.ts"
  },
  {
    "name": "/model",
    "category": "Configuration",
    "input": "<selection>",
    "description": "Open the model picker and select a provider route and model.",
    "source": "packages/client/ui-model-selection/src/client/index.ts"
  }
];
