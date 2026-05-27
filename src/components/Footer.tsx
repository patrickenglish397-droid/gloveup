export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 text-center text-xs text-muted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div>© {new Date().getFullYear()} GloveUp · Marketing preview · all data shown is mocked</div>
        <div className="flex gap-5">
          <a href="#" className="hover:text-ink">Privacy</a>
          <a href="#" className="hover:text-ink">Terms</a>
          <a href="mailto:hello@gloveup.example" className="hover:text-ink">hello@gloveup.example</a>
        </div>
      </div>
    </footer>
  );
}
