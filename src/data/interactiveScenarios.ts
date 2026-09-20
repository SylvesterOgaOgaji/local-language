import { InteractiveScamScenario } from '../types';

export const INTERACTIVE_SCAM_SCENARIOS: InteractiveScamScenario[] = [
  {
    id: 'scam-1',
    sender: 'CBN-DISBURSE',
    channel: 'SMS',
    messageText: 'URGENT: Your Federal Govt ₦75,000 Artisan Subsidy Grant has been approved. To credit your account today, verify your BVN & ATM Card PIN at: http://cbn-grant-portal2026.online within 2 hours.',
    isScam: true,
    indicators: [
      'Threat of false urgency ("within 2 hours")',
      'Unofficial domain name ending in .online',
      'Asks for secret ATM PIN and BVN via an external link',
      'The Central Bank of Nigeria (CBN) never texts individuals to collect private card PINs',
    ],
    explanation: 'This is a classic phishing SMS. Legitimate government grants are never distributed by asking citizens to input banking PINs into third-party websites.',
  },
  {
    id: 'scam-2',
    sender: 'WhatsApp Group Contact (+234 802 000 1122)',
    channel: 'WhatsApp',
    messageText: 'Hello bro, I am adding you to the new Church/Community Committee Group on WhatsApp. An SMS 6-digit code was sent to your phone by mistake for verification. Please read the 6 numbers for me so I can complete your addition.',
    isScam: true,
    indicators: [
      'Social engineering trick exploiting communal trust (Church/Community group)',
      'The 6-digit code is the WhatsApp registration OTP for YOUR account',
      'If you give them the code, they will take over your WhatsApp account instantly',
    ],
    explanation: 'Scammers hijack WhatsApp accounts by requesting registration codes sent via SMS. Never share SMS OTPs or 6-digit WhatsApp codes with anyone.',
  },
  {
    id: 'scam-3',
    sender: 'OPay / PalmPay In-App Security',
    channel: 'SMS',
    messageText: 'Your transaction of ₦2,500 for Airtime on 0803XXXXXXX was successful. Bal: ₦14,200. Ref: TXN99823412. Download your receipt inside the official app.',
    isScam: false,
    indicators: [
      'Standard automated receipt notice',
      'Does not contain any suspicious clickable links',
      'Does not ask for passwords, BVN, or PINs',
      'Advises checking inside the official mobile application',
    ],
    explanation: 'This is a standard informational transaction alert. It does not solicit credentials or demand immediate emergency action.',
  },
  {
    id: 'scam-4',
    sender: 'Alert: 0809-FAKE-ALERT',
    channel: 'SMS',
    messageText: 'Credit: ₦45,000.00 from KELVIN OKONKWO / FBN to ACCT: 0123****99. Desc: PAYMENT FOR GOODS. Avail Bal: ₦45,200.00. Thank you for banking with us.',
    isScam: true,
    indicators: [
      'Sent from an ordinary 11-digit GSM phone number rather than an official bank alphanumeric sender ID (like FIRSTBANK or GTBank)',
      'Commonly used by fraudsters buying goods in markets before fleeing',
    ],
    explanation: 'Always open your official banking app to verify available balance before releasing goods to customers in markets. Never rely on SMS previews.',
  },
  {
    id: 'scam-5',
    sender: 'QUICK-CASH-LOAN-APK',
    channel: 'SMS',
    messageText: 'DEFAMATION NOTICE: Your contact Mr. Emeka is an absconded fraudster who owes ₦18,500. As his guarantor, pay within 1 hour to 9921002233 or we will broadcast your photo and full name to your employer and church members.',
    isScam: true,
    indicators: [
      'Predatory unlicenced loan app harassment tactic violating the Nigeria Data Protection Act (NDPA)',
      'Threatens social shaming and defamation to third parties who never consented to be guarantors',
      'Harvested contacts illegally through sideloaded APK permissions on the borrower’s smartphone',
    ],
    explanation: 'Predatory loan apps harvest entire contact books and send extortion messages. Do not pay fraudsters. Report the app and phone number to the FCCPC and Nigeria Data Protection Commission (NDPC).',
  },
  {
    id: 'scam-6',
    sender: 'Voice Call (+234 813 000 8899)',
    channel: 'Phone Call',
    messageText: '“Hello Dad/Uncle, I was arrested by SARS/Police patrol at Ikeja checkpoint right now. They want to lock me up. The officer said if you transfer ₦30,000 bail immediately to this POS account 0123884422, they will let me go right now!” (Voice sounds like your relative)',
    isScam: true,
    indicators: [
      'Emergency extortion scheme using AI voice cloning or synthetic audio impersonation',
      'Extreme panic and urgency designed to bypass logical reasoning',
      'Demands immediate transfer to an unknown personal or POS account',
    ],
    explanation: 'Modern AI tools can clone voices from short social media videos. Always hang up and call your relative directly on their known phone number or contact another family member before sending any money.',
  },
];
