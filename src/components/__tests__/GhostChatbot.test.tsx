import { render, screen, fireEvent } from '@testing-library/react';
import { GhostChatbot } from '@/components/GhostChatbot';

describe('GhostChatbot', () => {
  // Regression: the drawer header referenced an undeclared GROQ_KEY, so opening the chat threw a
  // ReferenceError and blanked the entire site.
  it('opens the chat drawer without crashing', () => {
    render(<GhostChatbot />);
    fireEvent.click(screen.getByRole('button', { name: /open chat/i }));
    expect(screen.getByRole('dialog', { name: /chat with the portfolio assistant/i })).toBeInTheDocument();
    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
  });

  it('closes with Escape', async () => {
    render(<GhostChatbot />);
    fireEvent.click(screen.getByRole('button', { name: /open chat/i }));
    fireEvent.keyDown(document, { key: 'Escape' });
    await vi.waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('falls back to the offline knowledge base when the API is unreachable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    render(<GhostChatbot />);
    fireEvent.click(screen.getByRole('button', { name: /open chat/i }));
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'what is your tech stack?' } });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/React, Next\.js, TypeScript/)).toBeInTheDocument();
    expect(screen.getByText('Knowledge Base')).toBeInTheDocument();
    vi.unstubAllGlobals();
  });
});
