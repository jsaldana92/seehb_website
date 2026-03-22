import React, { useMemo, useRef, useState } from 'react';
import seehbLogo from '../assets/logos/seehb_logo.png';

// =====================
// Backend config (Google Apps Script)
// =====================
const ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxjm1wBgFFxPHAxC0thJjcCLBln9eh_grJYUknxWL1Cg5yW6hN4-SaXINTLZxo0uUTPhQ/exec';
const APP_TOKEN =
  'PFVlQSiuuVqOKaXSfyGBllX0sjubwoFQlXJAdIAv3kwjqEphSeY0pvVzTWlU456l';

const ACCEPTED_EXTENSIONS = ['.ppt', '.pptx'];
const ACCEPTED_MIME_TYPES = [
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
];

function sanitizeNamePiece(value) {
  return String(value || '')
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9._-]/g, '');
}

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = String(reader.result || '');
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      resolve(base64);
    };

    reader.onerror = () => {
      reject(new Error('Could not read the selected file.'));
    };

    reader.readAsDataURL(file);
  });
}

export default function LightingSlides() {
  const fileInputRef = useRef(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [file, setFile] = useState(null);
  const [honey, setHoney] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const acceptedTypesText = useMemo(() => '.ppt, .pptx', []);

  function resetForm() {
    setFirstName('');
    setLastName('');
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function validateSelectedFile(selectedFile) {
    if (!selectedFile) {
      return 'Please upload a PowerPoint file.';
    }

    const lowerName = selectedFile.name.toLowerCase();
    const hasAllowedExtension = ACCEPTED_EXTENSIONS.some((ext) =>
      lowerName.endsWith(ext)
    );
    const hasAllowedMime = ACCEPTED_MIME_TYPES.includes(selectedFile.type);

    if (!hasAllowedExtension && !hasAllowedMime) {
      return 'Please upload a .ppt or .pptx file only.';
    }

    return '';
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (honey.trim()) {
      setStatus({
        state: 'success',
        message: 'Thanks! Your slide has been submitted.',
      });
      resetForm();
      return;
    }

    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();

    if (!trimmedFirst || !trimmedLast) {
      setStatus({
        state: 'error',
        message: 'Please enter your first and last name.',
      });
      return;
    }

    const fileError = validateSelectedFile(file);
    if (fileError) {
      setStatus({ state: 'error', message: fileError });
      return;
    }

    setStatus({ state: 'loading', message: '' });

    try {
      const fileBase64 = await readFileAsBase64(file);
      const payload = {
        token: APP_TOKEN,
        firstName: trimmedFirst,
        lastName: trimmedLast,
        compiledName: `${trimmedFirst} ${trimmedLast}`,
        originalFileName: file.name,
        fileMimeType: file.type,
        fileBase64,
      };

      await fetch(ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=UTF-8',
        },
        body: JSON.stringify(payload),
      });

      setStatus({
        state: 'success',
        message:
          'Thanks! Your slide has been submitted. If you need to replace it, submit the updated file again.',
      });
      resetForm();
    } catch (error) {
      setStatus({
        state: 'error',
        message: 'Something went wrong. Please try again.',
      });
    }
  }

  return (
    <section className="bg-[#F0F0F0] min-h-[calc(100vh-72px)] px-6 py-10 md:py-14">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8">
        <div className="flex flex-col items-center text-center">
          <img
            src={seehbLogo}
            alt="SEEHB logo"
            className="h-20 w-auto md:h-24"
          />
          <h1 className="mt-5 text-3xl md:text-4xl font-bold text-black custom-shadow-sm">
            Lighting Slide Submission
          </h1>
          <div className="mt-4 h-[3px] w-48 rounded-full bg-gray-500 opacity-50" />
          <p className="mt-5 max-w-2xl text-lg md:text-xl leading-relaxed text-black custom-shadow-sm">
            Please submit your lighting slide for SEEHB 2026 below.
          </p>
          <p className="mt-2 max-w-2xl text-sm md:text-base text-black/70">
            Upload PowerPoint files only. Google Slides should be exported as a
            PowerPoint file before submission.
          </p>
        </div>

        <div className="w-full max-w-2xl rounded-2xl border border-black/10 bg-white/90 p-6 shadow-md md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="website"
              autoComplete="off"
              tabIndex="-1"
              className="hidden"
              value={honey}
              onChange={(e) => setHoney(e.target.value)}
            />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="lighting-first-name"
                  className="mb-2 block text-sm font-semibold text-black"
                >
                  First Name
                </label>
                <input
                  id="lighting-first-name"
                  type="text"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-md border border-black/20 bg-[#fcfcfc] px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/30"
                  placeholder="First name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="lighting-last-name"
                  className="mb-2 block text-sm font-semibold text-black"
                >
                  Last Name
                </label>
                <input
                  id="lighting-last-name"
                  type="text"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-md border border-black/20 bg-[#fcfcfc] px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/30"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="lighting-slide-file"
                className="mb-2 block text-sm font-semibold text-black"
              >
                PowerPoint File
              </label>
              <input
                ref={fileInputRef}
                id="lighting-slide-file"
                type="file"
                accept={acceptedTypesText}
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0] || null;
                  setFile(selectedFile);
                  if (status.state !== 'idle') {
                    setStatus({ state: 'idle', message: '' });
                  }
                }}
                className="block w-full rounded-md border border-black/20 bg-[#fcfcfc] px-4 py-3 text-sm shadow-sm file:mr-4 file:rounded-md file:border-0 file:bg-[#F6BB17]/90 file:px-4 file:py-2 file:font-semibold file:text-black hover:file:bg-[#F6BB17] focus:outline-none focus:ring-2 focus:ring-black/30"
                required
              />
              <p className="mt-2 text-sm text-black/60">
                Accepted file types: .ppt and .pptx
              </p>
              {file && (
                <p className="mt-2 text-sm text-black/80">
                  Selected file: <span className="font-semibold">{file.name}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status.state === 'loading'}
              className="w-full rounded-md bg-[#F6BB17]/90 px-6 py-3 font-semibold text-black shadow-md transition-all duration-200 hover:scale-[1.01] hover:bg-[#F6BB17] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {status.state === 'loading' ? 'Submitting...' : 'Submit Lighting Slide'}
            </button>

            {status.state === 'success' && (
              <p className="text-sm text-green-900">{status.message}</p>
            )}
            {status.state === 'error' && (
              <p className="text-sm text-red-900">{status.message}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
