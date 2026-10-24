/**
 * Kamran Manpower Requirements Receiver (Google Apps Script)
 * Saves each submission to the Google Sheet, emails Maaz (summary + JSON file)
 * and emails the client (summary only).
 */
const CONFIG = {
  SHEET_ID: '1ZHOvhr035ggGGoMZnmicLWAXOMJWrJFSvhQ270jh0Dw',
  SHEET_NAME: 'Sheet1',
  ADMIN_EMAIL: 'maazalisshahid@gmail.com', // Check if single 's' or double 's' matches your inbox!
  SENDER_NAME: 'Maaz Ali'
};

const FIELDS = [
  {"k": "full_name", "s": "Welcome & Business Profile", "q": "Full name", "o": {}},
  {"k": "company", "s": "Welcome & Business Profile", "q": "Company / agency name", "o": {}},
  {"k": "email", "s": "Welcome & Business Profile", "q": "Business email", "o": {}},
  {"k": "phone", "s": "Welcome & Business Profile", "q": "Contact number (with country code)", "o": {}},
  {"k": "country", "s": "Welcome & Business Profile", "q": "Country where you operate", "o": {}},
  {"k": "website", "s": "Welcome & Business Profile", "q": "Existing website (if any)", "o": {}},
  {"k": "biz_type", "s": "Welcome & Business Profile", "q": "Type of business", "o": {"manpower": "Manpower supply", "outsourcing": "Workforce outsourcing", "temp": "Temporary staffing", "recruitment": "Recruitment services", "labour": "Labour supply", "other": "Other", "unsure": "Not sure how to categorize"}},
  {"k": "worker_count", "s": "Welcome & Business Profile", "q": "How many workers do you currently manage?", "o": {"u25": "Under 25", "25_100": "25–100", "101_500": "101–500", "501_1000": "501–1,000", "over1000": "More than 1,000", "unsure": "Not sure"}},
  {"k": "client_count", "s": "Welcome & Business Profile", "q": "How many client companies do you serve?", "o": {}},
  {"k": "services", "s": "Welcome & Business Profile", "q": "Describe your services (optional)", "o": {}},
  {"k": "current_tools", "s": "Current Business Operations", "q": "How do you manage workers, hours, salaries and company payments now?", "o": {"excel": "Excel", "gsheets": "Google Sheets", "accounting": "Accounting software", "paper": "Paper records", "whatsapp": "WhatsApp / messages", "manual": "Manual calculations", "other": "Other"}},
  {"k": "problems", "s": "Current Business Operations", "q": "Biggest problems you face (select all that apply)", "o": {"pay_calc": "Calculating worker payments", "hours": "Tracking working hours", "bills": "Calculating company bills", "profit_worker": "Knowing profit per worker", "profit_company": "Knowing profit per company", "unpaid_workers": "Tracking unpaid worker payments", "unpaid_clients": "Tracking unpaid client invoices", "reports": "Preparing reports", "duplicate": "Repeated manual data entry", "other": "Other"}},
  {"k": "report_freq", "s": "Current Business Operations", "q": "How often do you prepare calculations and reports? (Select all that apply)", "o": {"daily": "Daily", "weekly": "Weekly", "10day": "Every 10 days", "15day": "Every 15 days", "monthly": "Monthly", "other": "Other"}},
  {"k": "who_enters", "s": "Current Business Operations", "q": "Who currently enters and checks this information?", "o": {}},
  {"k": "workflow", "s": "Current Business Operations", "q": "Describe the flow: from recording hours to getting paid by the company and paying the worker", "o": {}},
  {"k": "top_problem", "s": "Current Business Operations", "q": "What is the single most important problem the new system must solve?", "o": {}},
  {"k": "separate_records", "s": "Workers & Client Companies", "q": "Should the system keep separate records for workers and client companies?", "o": {"yes": "Yes", "no": "No", "unsure": "Not sure"}},
  {"k": "worker_fields", "s": "Workers & Client Companies", "q": "Worker details needed (select all that apply)", "o": {"emp_id": "Internal employee ID", "contact": "Contact information", "status": "Status (active / inactive)", "assigned_co": "Assigned client company", "role": "Job role", "join_date": "Joining date", "id_docs": "Identity documents (passport / Emirates ID)"}},
  {"k": "worker_multi", "s": "Workers & Client Companies", "q": "Can a worker work for different companies in different periods?", "o": {"yes": "Yes", "no": "No"}},
  {"k": "overtime", "s": "Workers & Client Companies", "q": "Do overtime or different shift rates apply?", "o": {"yes": "Yes", "no": "No"}},
  {"k": "overtime_rules", "s": "Workers & Client Companies", "q": "Explain the overtime and shift rules", "o": {}},
  {"k": "rate_varies", "s": "Workers & Client Companies", "q": "Does the billing rate vary by worker, company, job role or shift?", "o": {"no": "No, same rate", "worker": "Yes, by worker", "company": "Yes, by company", "role": "Yes, by job role", "mixed": "Yes, a combination"}},
  {"k": "rate_detail", "s": "Workers & Client Companies", "q": "Explain how rates change", "o": {}},
  {"k": "co_fields", "s": "Workers & Client Companies", "q": "Client company details needed", "o": {"co_name": "Company name", "trn": "Tax registration number (TRN)", "contact_person": "Contact person", "terms": "Payment terms (e.g. 30 days)", "invoices": "Invoice history", "balance": "Outstanding balance"}},
  {"k": "hours_source", "s": "Working Hours & Timesheets", "q": "How are working hours recorded now? (select all that apply)", "o": {"admin": "Entered manually by admin", "office": "Entered by office staff", "excel": "Imported from Excel", "client": "Received from client companies", "worker": "Submitted by workers", "other": "Other"}},
  {"k": "daily_ts", "s": "Working Hours & Timesheets", "q": "Do you need daily timesheets?", "o": {"yes": "Yes", "no": "No"}},
  {"k": "ts_fields", "s": "Working Hours & Timesheets", "q": "Timesheet should record", "o": {"regular": "Regular hours", "overtime": "Overtime hours", "shift": "Shift type", "dates": "Working dates"}},
  {"k": "approval", "s": "Working Hours & Timesheets", "q": "Should timesheets be approved before they count in payroll or billing?", "o": {"yes": "Yes", "no": "No"}},
  {"k": "approver", "s": "Working Hours & Timesheets", "q": "Who approves timesheets?", "o": {}},
  {"k": "corrections", "s": "Working Hours & Timesheets", "q": "Are corrections to submitted hours allowed? Should changes be logged?", "o": {"yes_log": "Yes, and keep a change log", "yes_nolog": "Yes, no log needed", "no": "No"}},
  {"k": "missing_hours", "s": "Working Hours & Timesheets", "q": "How should missing or disputed hours be handled?", "o": {}},
  {"k": "pay_arr", "s": "Working Hours & Timesheets", "q": "Payment arrangements for workers (select all that apply)", "o": {"hourly": "Hourly rate", "daily": "Daily wage", "monthly": "Monthly salary", "mixed": "Mixed arrangements"}},
  {"k": "special_days", "s": "Working Hours & Timesheets", "q": "Do overnight shifts or holidays have special rules? Explain.", "o": {}},
  {"k": "worker_pay_method", "s": "Payroll, Billing & Profit", "q": "How is the worker's payment calculated?", "o": {}},
  {"k": "company_bill_method", "s": "Payroll, Billing & Profit", "q": "How is the company billing amount calculated?", "o": {}},
  {"k": "rate_unit", "s": "Payroll, Billing & Profit", "q": "What rate do you charge the company?", "o": {"hour": "Per hour", "day": "Per day", "month": "Per month", "other": "Other"}},
  {"k": "calc_features", "s": "Payroll, Billing & Profit", "q": "Calculations needed in the first version (select all that apply)", "o": {"total_hours": "Total hours worked", "bill_amt": "Amount billable per company", "pay_amt": "Amount payable per worker", "margin": "Margin per worker and per company", "period": "Profit by period (weekly, 10/15 days, monthly)", "outstanding": "Outstanding client invoices and unpaid worker payments", "net_profit": "Net profit after expenses"}},
  {"k": "expenses", "s": "Payroll, Billing & Profit", "q": "Which expenses should reduce profit?", "o": {"transport": "Transport", "accommodation": "Accommodation", "uniform": "Uniforms / equipment", "recruitment": "Recruitment costs", "other_exp": "Other", "none": "None"}},
  {"k": "expense_detail", "s": "Payroll, Billing & Profit", "q": "Describe how these expenses are charged", "o": {}},
  {"k": "est_or_actual", "s": "Payroll, Billing & Profit", "q": "Should the system only estimate, or also record actual payments?", "o": {"est": "Estimates only", "actual": "Estimates and actual payment records"}},
  {"k": "payroll_notes", "s": "Payroll, Billing & Profit", "q": "Anything else about your calculations? (optional)", "o": {}},
  {"k": "reports", "s": "Reports, Documents & Existing Data", "q": "Which reports do you need?", "o": {"worker_pay": "Worker payment summary", "co_bill": "Company billing summary", "worker_profit": "Profit per worker", "co_profit": "Profit per company", "outstanding": "Outstanding invoices and unpaid payments", "dashboard": "Financial dashboard with charts"}},
  {"k": "export", "s": "Reports, Documents & Existing Data", "q": "Export formats needed", "o": {"excel": "Excel", "csv": "CSV", "pdf": "PDF", "print": "Printable page"}},
  {"k": "existing_data", "s": "Reports, Documents & Existing Data", "q": "Where is your current data stored?", "o": {"excel": "Excel workbooks", "gsheets": "Google Sheets", "accounting": "Accounting software", "paper": "Paper", "other": "Other"}},
  {"k": "migration", "s": "Reports, Documents & Existing Data", "q": "Should old spreadsheet data be imported into the new system?", "o": {"yes": "Yes", "no": "No"}},
  {"k": "existing_notes", "s": "Reports, Documents & Existing Data", "q": "Describe your existing records (optional). Please remove personal or sensitive data before sharing any sample files later.", "o": {}},
  {"k": "who_uses", "s": "Users, Permissions & Security", "q": "Who will use the system?", "o": {"owner": "Owner only", "owner_staff": "Owner and office staff", "managers": "Managers and staff", "multi": "Multiple departments"}},
  {"k": "user_count", "s": "Users, Permissions & Security", "q": "How many users are expected?", "o": {"1_3": "1–3", "4_10": "4–10", "10plus": "More than 10"}},
  {"k": "perm_needed", "s": "Users, Permissions & Security", "q": "Should different users have different permissions?", "o": {"yes": "Yes", "no": "No"}},
  {"k": "hide_wages", "s": "Users, Permissions & Security", "q": "Should some users be blocked from seeing worker wages or profit?", "o": {"yes": "Yes", "no": "No"}},
  {"k": "audit", "s": "Users, Permissions & Security", "q": "Should the system record who added or changed important records?", "o": {"yes": "Yes", "no": "No"}},
  {"k": "backups", "s": "Users, Permissions & Security", "q": "Are regular backups important to you?", "o": {"yes": "Yes", "no": "No", "unsure": "Not sure"}},
  {"k": "want_site", "s": "Public Company Website", "q": "Do you want a public website?", "o": {"yes": "Yes, needed", "later": "Maybe later", "no": "No"}},
  {"k": "site_pages", "s": "Public Company Website", "q": "Pages and features needed", "o": {"home": "Home", "about": "About us", "services": "Services", "industries": "Industries served", "contact": "Contact page", "whatsapp": "WhatsApp button", "enquiry": "Enquiry / quote form", "careers": "Careers and job application", "profile_pdf": "Company profile download"}},
  {"k": "site_has", "s": "Public Company Website", "q": "What do you already have? (select all that apply)", "o": {"logo": "Logo and branding", "domain": "Domain name", "hosting": "Hosting account", "content": "Approved text and photos"}},
  {"k": "site_clients", "s": "Public Company Website", "q": "What types of corporate clients do you want to attract? Who will update the content?", "o": {}},
  {"k": "devices", "s": "Technical Preferences", "q": "Which devices must the system work on?", "o": {"desk": "Desktop and laptop", "mobile": "Mobile phone", "all": "All of these"}},
  {"k": "access", "s": "Technical Preferences", "q": "Where should it be accessible?", "o": {"online": "Online through a secure website", "local": "Only inside the office network", "unsure": "Not sure, recommend the best option"}},
  {"k": "travel_access", "s": "Technical Preferences", "q": "Do you need to access it while travelling?", "o": {"yes": "Yes", "no": "No"}},
  {"k": "currency", "s": "Technical Preferences", "q": "Currencies needed", "o": {"aed": "AED", "pkr": "PKR", "usd": "USD", "other": "Other"}},
  {"k": "default_currency", "s": "Technical Preferences", "q": "Default currency for reports", "o": {"aed": "AED", "pkr": "PKR"}},
  {"k": "notifications", "s": "Technical Preferences", "q": "Notifications wanted", "o": {"email": "Email notifications", "reminder": "Reminders for unpaid invoices or due payments", "none": "None"}},
  {"k": "integrations", "s": "Technical Preferences", "q": "Any integrations needed (Google Sheets, accounting software, WhatsApp)? Explain.", "o": {}},
  {"k": "hosting_have", "s": "Technical Preferences", "q": "Do you already have a domain, server or hosting account?", "o": {"yes": "Yes", "no": "No", "unsure": "Not sure"}},
  {"k": "hosting_detail", "s": "Technical Preferences", "q": "Which domain or hosting do you have?", "o": {}},
  {"k": "tech_other", "s": "Technical Preferences", "q": "Other technical requirements (optional)", "o": {}},
  {"k": "budget_range", "s": "Budget, Timeline & Priorities", "q": "Budget range you are comfortable with (PKR)", "o": {"lt50": "Under PKR 50,000", "50_100": "PKR 50,000–100,000", "100_150": "PKR 100,000–150,000", "150_250": "PKR 150,000–250,000", "250_400": "PKR 250,000–400,000", "gt400": "Above PKR 400,000", "custom": "Custom amount (enter below)", "discuss": "Prefer to discuss", "unsure": "Not sure yet"}},
  {"k": "budget_custom", "s": "Budget, Timeline & Priorities", "q": "Enter amount and currency (e.g. AED 20,000)", "o": {}},
  {"k": "budget_includes_hosting", "s": "Budget, Timeline & Priorities", "q": "Does this budget include hosting and ongoing support, or only development?", "o": {"yes": "Includes hosting and support", "dev_only": "Development only", "unsure": "Not sure"}},
  {"k": "first_version", "s": "Budget, Timeline & Priorities", "q": "Would you prefer a basic first version, with more features added later?", "o": {"basic": "Yes, basic first", "full": "Full system at once", "phased": "Phased, decide later"}},
  {"k": "phased_features", "s": "Budget, Timeline & Priorities", "q": "Which features should be in the first release?", "o": {}},
  {"k": "top3", "s": "Budget, Timeline & Priorities", "q": "Which three features matter most to you?", "o": {}},
  {"k": "deadline", "s": "Budget, Timeline & Priorities", "q": "When would you ideally like the first version ready? (optional)", "o": {}},
  {"k": "separate_quotes", "s": "Budget, Timeline & Priorities", "q": "Would you like separate quotes for the management system and the public website?", "o": {"yes": "Yes", "no": "No", "unsure": "Not sure"}},
  {"k": "extra_req", "s": "Additional Requirements & Questions", "q": "Anything else the system must do?", "o": {}},
  {"k": "business_rules", "s": "Additional Requirements & Questions", "q": "Special business rules not covered above", "o": {}},
  {"k": "liked_systems", "s": "Additional Requirements & Questions", "q": "Existing systems or websites you like (optional)", "o": {}},
  {"k": "dislikes", "s": "Additional Requirements & Questions", "q": "Anything you definitely do NOT want?", "o": {}},
  {"k": "questions", "s": "Additional Requirements & Questions", "q": "Questions for the developer", "o": {}}
];

function doGet() {
  return json_({ ok: true, service: 'kamran-requirements' });
}

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    console.error('JSON parse error:', err);
    return json_({ ok: false, hint: 'The form data could not be read. Please try again.' });
  }

  const answers = buildAnswers_(body);

  // 1. Save to Google Sheet
  try {
    appendRow_(body, answers);
  } catch (err) {
    console.error('Sheet save error:', err);
    notifyAdmin_('Sheet save failed', err, body);
    return json_({ ok: false, hint: 'Could not save right now. Your answers are still on this device, please try again.' });
  }

  // 2. Dispatch Emails
  let emailSuccess = false;
  let emailError = null;
  try {
    sendEmails_(body, answers);
    emailSuccess = true;
  } catch (err) {
    emailError = err.toString();
    console.error('Email dispatch error:', err);
    notifyAdmin_('Email send failed', err, body);
  }

  return json_({
    ok: true,
    sheet_saved: true,
    email_dispatched: emailSuccess,
    email_error: emailError
  });
}

function buildAnswers_(body) {
  const out = {};
  FIELDS.forEach(f => { out[f.k] = pretty_(f, body[f.k]); });
  return out;
}

function pretty_(f, v) {
  if (v === undefined || v === null) return '';
  const t = (Array.isArray(v) ? v.join(', ') : String(v)).trim();
  if (!t) return '';
  if (f.o && Object.keys(f.o).length) return t.split(', ').map(x => f.o[x] || x).join(', ');
  return t;
}

function appendRow_(body, answers) {
  const sheet = SpreadsheetApp.openById(CONFIG.SHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) throw new Error('Sheet tab not found: ' + CONFIG.SHEET_NAME);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(h => String(h).trim());
  const data = Object.assign({
    submitted_at: body.submitted_at || new Date().toISOString(),
    language: body.language || ''
  }, answers);
  sheet.appendRow(headers.map(h => safeCell_(data[h] !== undefined ? data[h] : '')));
}

function safeCell_(v) {
  const s = String(v);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function sendEmails_(body, answers) {
  const name = String(body.full_name || 'Client').trim();
  const email = String(body.email || '').trim();
  const company = String(body.company || '').trim();
  const submitted = body.submitted_at || new Date().toISOString();
  const subject = 'New requirements from ' + name;

  const { html, subject: _subject, ...raw } = body;
  const safeName = name.replace(/[^a-z0-9]+/gi, '-').toLowerCase().replace(/^-+|-+$/g, '') || 'client';
  const jsonFile = Utilities.newBlob(JSON.stringify(raw, null, 2), 'application/json', 'kamran-requirements-' + safeName + '.json');

  // Email to Admin (Maaz)
  try {
    MailApp.sendEmail({
      to: CONFIG.ADMIN_EMAIL,
      subject: subject,
      name: CONFIG.SENDER_NAME,
      htmlBody: buildHtml_(name, email, company, submitted, answers, true),
      attachments: [jsonFile]
    });
    console.log('Admin email successfully sent to: ' + CONFIG.ADMIN_EMAIL);
  } catch (adminErr) {
    console.error('Failed to send admin email to ' + CONFIG.ADMIN_EMAIL + ':', adminErr);
    throw adminErr;
  }

  // Email to Client
  if (email && email.indexOf('@') > 0) {
    try {
      MailApp.sendEmail({
        to: email,
        subject: subject,
        name: CONFIG.SENDER_NAME,
        htmlBody: buildHtml_(name, email, company, submitted, answers, false)
      });
      console.log('Client confirmation email sent to: ' + email);
    } catch (clientErr) {
      console.error('Failed to send client email to ' + email + ':', clientErr);
    }
  }
}

function buildHtml_(name, email, company, submitted, answers, forMaaz) {
  let rows = '';
  let last = '';
  FIELDS.forEach(f => {
    const v = answers[f.k];
    if (!v) return;
    if (f.s !== last) {
      if (last) rows += '</table>';
      rows += '<h3 style="background:#4f46e5;color:#fff;padding:8px 12px;border-radius:6px;margin:22px 0 6px;font-size:15px">' + esc_(f.s) + '</h3>'
            + '<table style="border-collapse:collapse;width:100%">';
      last = f.s;
    }
    rows += '<tr><td style="padding:8px;border-bottom:1px solid #e3e5ee;width:45%;vertical-align:top;color:#444">' + esc_(f.q) + '</td>'
          + '<td style="padding:8px;border-bottom:1px solid #e3e5ee;vertical-align:top"><b>' + esc_(v) + '</b></td></tr>';
  });
  if (last) rows += '</table>';
  const head = '<div style="font-family:Arial,Helvetica,sans-serif;max-width:760px;margin:auto;color:#1c2033">'
    + '<h2 style="margin:0 0 4px">New manpower agency requirements submission</h2>'
    + '<p style="margin:0 0 16px;color:#6b7089">Prepared by Maaz Ali &middot; AI with Hammad</p>'
    + '<table style="border-collapse:collapse;margin-bottom:18px">'
    + '<tr><td style="padding:4px 12px 4px 0"><b>Name</b></td><td>' + esc_(name) + '</td></tr>'
    + '<tr><td style="padding:4px 12px 4px 0"><b>Email</b></td><td>' + esc_(email) + '</td></tr>'
    + '<tr><td style="padding:4px 12px 4px 0"><b>Company</b></td><td>' + esc_(company) + '</td></tr>'
    + '<tr><td style="padding:4px 12px 4px 0"><b>Submitted</b></td><td>' + esc_(submitted) + '</td></tr>'
    + '</table>';
  const foot = forMaaz
    ? 'The full answers are also attached as a JSON file.'
    : 'Thank you for sharing your requirements. We will review them and get back to you.';
  return head + rows + '<p style="color:#6b7089;font-size:12px;margin-top:20px">' + foot + '</p></div>';
}

function esc_(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
}

function notifyAdmin_(title, err, body) {
  try {
    MailApp.sendEmail(CONFIG.ADMIN_EMAIL, 'Form problem: ' + title,
      String(err) + '\n\nSubmission:\n' + JSON.stringify(body, null, 2));
  } catch (x) {
    console.error('notifyAdmin failed:', x);
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Run this ONCE from the Apps Script editor (select "authorize" in the dropdown and press ▶ Run) to grant permissions and test email.
function authorize() {
  Logger.log('Spreadsheet Name: ' + SpreadsheetApp.openById(CONFIG.SHEET_ID).getName());
  Logger.log('Mail quota left today: ' + MailApp.getRemainingDailyQuota());
  
  // Send test authorization email
  MailApp.sendEmail({
    to: CONFIG.ADMIN_EMAIL,
    subject: 'Authorization Test - Kamran Manpower System',
    body: 'Your Google Apps Script permissions are authorized and working!'
  });
  Logger.log('Test email successfully dispatched to: ' + CONFIG.ADMIN_EMAIL);
}
