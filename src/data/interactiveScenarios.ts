import { InteractiveScamScenario } from '../types';

export const INTERACTIVE_SCAM_SCENARIOS: InteractiveScamScenario[] = [
  {
    id: 'scam-1',
    sender: 'CBN-DISBURSE',
    channel: 'SMS',
    messageText: 'URGENT: Your Federal Govt ₦75,000 Artisan Subsidy Grant has been approved. To credit your account today, verify your BVN & ATM Card PIN at: http://cbn-grant-portal2026.online within 2 hours.',
    isScam: true,
    indicators: [
      'Threat of urgency ("within 2 hours")',
      'Unofficial domain name ending in .online',
      'Asks for secret ATM PIN and BVN via an external link',
      'The Central Bank of Nigeria (CBN) does not text individuals to collect card PINs',
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
      'Social engineering trick using community trust',
      'The 6-digit code is the WhatsApp registration code for YOUR account',
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
];
