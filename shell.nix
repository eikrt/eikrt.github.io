{ pkgs ? import <nixpkgs> { } }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    ruby_3_3
    # native extensions (nokogiri, ffi, eventmachine, commonmarker)
    pkg-config
    libffi
    libxml2
    libxslt
    zlib
    openssl
  ];

  shellHook = ''
    # keep gems local to the project
    export BUNDLE_PATH="$PWD/.bundle/gems"
    export GEM_HOME="$BUNDLE_PATH"
    export PATH="$GEM_HOME/bin:$PATH"
    bundle config set --local build.nokogiri --use-system-libraries >/dev/null

    echo "Jekyll dev shell. Run: bundle install && bundle exec jekyll serve"
  '';
}
