const SynthUI = `
<div class="Synth">
			<div class="SynthControls">
				<div class="SynthControls_row">
					<button type="button" id="kill">Kill Audio</button
					><button data-on="false" type="button" class="PowerButton">
						Off
					</button>
				</div>
			</div>
			<div class="SynthKeysPanel">
				<div class="SynthKeysPanel_inner">
					<div data-key="white" class="SynthKey">
						<button
							type="button"
							data-note="C"
							data-octave="1"
							class="SynthWhiteKey"
						>
							<div class="SynthWhiteKey">C<span>1</span></div>
						</button>
					</div>
					<div data-key="black" class="SynthKey">
						<button
							type="button"
							data-note="C#"
							data-octave="1"
							class="SynthBlackKey"
						>
							<div class="SynthBlackKey_label">C#</div>
						</button>
					</div>
					<div data-key="white" class="SynthKey">
						<button
							type="button"
							data-note="D"
							data-octave="1"
							class="SynthWhiteKey"
						>
							<div class="SynthWhiteKey">D<span>1</span></div>
						</button>
					</div>
					<div data-key="black" class="SynthKey">
						<button
							type="button"
							data-note="D#"
							data-octave="1"
							class="SynthBlackKey"
						>
							<div class="SynthBlackKey_label">D#</div>
						</button>
					</div>
					<div data-key="white" class="SynthKey">
						<button
							type="button"
							data-note="E"
							data-octave="1"
							class="SynthWhiteKey"
						>
							<div class="SynthWhiteKey">E<span>1</span></div>
						</button>
					</div>
					<div data-key="white" class="SynthKey">
						<button
							type="button"
							data-note="F"
							data-octave="1"
							class="SynthWhiteKey"
						>
							<div class="SynthWhiteKey">F<span>1</span></div>
						</button>
					</div>
					<div data-key="black" class="SynthKey">
						<button
							type="button"
							data-note="F#"
							data-octave="1"
							class="SynthBlackKey"
						>
							<div class="SynthBlackKey_label">F#</div>
						</button>
					</div>
					<div data-key="white" class="SynthKey">
						<button
							type="button"
							data-note="G"
							data-octave="1"
							class="SynthWhiteKey"
						>
							<div class="SynthWhiteKey">G<span>1</span></div>
						</button>
					</div>
					<div data-key="black" class="SynthKey">
						<button
							type="button"
							data-note="G#"
							data-octave="1"
							class="SynthBlackKey"
						>
							<div class="SynthBlackKey_label">G#</div>
						</button>
					</div>
					<div data-key="white" class="SynthKey">
						<button
							type="button"
							data-note="A"
							data-octave="1"
							class="SynthWhiteKey"
						>
							<div class="SynthWhiteKey">A<span>1</span></div>
						</button>
					</div>
					<div data-key="black" class="SynthKey">
						<button
							type="button"
							data-note="A#"
							data-octave="1"
							class="SynthBlackKey"
						>
							<div class="SynthBlackKey_label">A#</div>
						</button>
					</div>
					<div data-key="white" class="SynthKey">
						<button
							type="button"
							data-note="B"
							data-octave="1"
							class="SynthWhiteKey"
						>
							<div class="SynthWhiteKey">B<span>1</span></div>
						</button>
					</div>
					<div data-key="white" class="SynthKey">
						<button
							type="button"
							data-note="C"
							data-octave="2"
							class="SynthWhiteKey"
						>
							<div class="SynthWhiteKey">C<span>2</span></div>
						</button>
					</div>
					<div data-key="black" class="SynthKey">
						<button
							type="button"
							data-note="C#"
							data-octave="2"
							class="SynthBlackKey"
						>
							<div class="SynthBlackKey_label">C#</div>
						</button>
					</div>
					<div data-key="white" class="SynthKey">
						<button
							type="button"
							data-note="D"
							data-octave="2"
							class="SynthWhiteKey"
						>
							<div class="SynthWhiteKey">D<span>2</span></div>
						</button>
					</div>
					<div data-key="black" class="SynthKey">
						<button
							type="button"
							data-note="D#"
							data-octave="2"
							class="SynthBlackKey"
						>
							<div class="SynthBlackKey_label">D#</div>
						</button>
					</div>
					<div data-key="white" class="SynthKey">
						<button
							type="button"
							data-note="E"
							data-octave="2"
							class="SynthWhiteKey"
						>
							<div class="SynthWhiteKey">E<span>2</span></div>
						</button>
					</div>
					<div data-key="white" class="SynthKey">
						<button
							type="button"
							data-note="F"
							data-octave="2"
							class="SynthWhiteKey"
						>
							<div class="SynthWhiteKey">F<span>2</span></div>
						</button>
					</div>
					<div data-key="black" class="SynthKey">
						<button
							type="button"
							data-note="F#"
							data-octave="2"
							class="SynthBlackKey"
						>
							<div class="SynthBlackKey_label">F#</div>
						</button>
					</div>
					<div data-key="white" class="SynthKey">
						<button
							type="button"
							data-note="G"
							data-octave="2"
							class="SynthWhiteKey"
						>
							<div class="SynthWhiteKey">G<span>2</span></div>
						</button>
					</div>
					<div data-key="black" class="SynthKey">
						<button
							type="button"
							data-note="G#"
							data-octave="2"
							class="SynthBlackKey"
						>
							<div class="SynthBlackKey_label">G#</div>
						</button>
					</div>
					<div data-key="white" class="SynthKey">
						<button
							type="button"
							data-note="A"
							data-octave="2"
							class="SynthWhiteKey"
						>
							<div class="SynthWhiteKey">A<span>2</span></div>
						</button>
					</div>
					<div data-key="black" class="SynthKey">
						<button
							type="button"
							data-note="A#"
							data-octave="2"
							class="SynthBlackKey"
						>
							<div class="SynthBlackKey_label">A#</div>
						</button>
					</div>
					<div data-key="white" class="SynthKey">
						<button
							type="button"
							data-note="B"
							data-octave="2"
							class="SynthWhiteKey"
						>
							<div class="SynthWhiteKey">B<span>2</span></div>
						</button>
					</div>
					<div data-key="white" class="SynthKey">
						<button
							type="button"
							data-note="C"
							data-octave="3"
							class="SynthWhiteKey"
						>
							<div class="SynthWhiteKey">C<span>3</span></div>
						</button>
					</div>
					<div data-key="black" class="SynthKey">
						<button
							type="button"
							data-note="C#"
							data-octave="3"
							class="SynthBlackKey"
						>
							<div class="SynthBlackKey_label">C#</div>
						</button>
					</div>
					<div data-key="white" class="SynthKey">
						<button
							type="button"
							data-note="D"
							data-octave="3"
							class="SynthWhiteKey"
						>
							<div class="SynthWhiteKey">D<span>3</span></div>
						</button>
					</div>
					<div data-key="black" class="SynthKey">
						<button
							type="button"
							data-note="D#"
							data-octave="3"
							class="SynthBlackKey"
						>
							<div class="SynthBlackKey_label">D#</div>
						</button>
					</div>
					<div data-key="white" class="SynthKey">
						<button
							type="button"
							data-note="E"
							data-octave="3"
							class="SynthWhiteKey"
						>
							<div class="SynthWhiteKey">E<span>3</span></div>
						</button>
					</div>
					<div data-key="white" class="SynthKey">
						<button
							type="button"
							data-note="F"
							data-octave="3"
							class="SynthWhiteKey"
						>
							<div class="SynthWhiteKey">F<span>3</span></div>
						</button>
					</div>
					<div data-key="black" class="SynthKey">
						<button
							type="button"
							data-note="F#"
							data-octave="3"
							class="SynthBlackKey"
						>
							<div class="SynthBlackKey_label">F#</div>
						</button>
					</div>
					<div data-key="white" class="SynthKey">
						<button
							type="button"
							data-note="G"
							data-octave="3"
							class="SynthWhiteKey"
						>
							<div class="SynthWhiteKey">G<span>3</span></div>
						</button>
					</div>
					<div data-key="black" class="SynthKey">
						<button
							type="button"
							data-note="G#"
							data-octave="3"
							class="SynthBlackKey"
						>
							<div class="SynthBlackKey_label">G#</div>
						</button>
					</div>
					<div data-key="white" class="SynthKey">
						<button
							type="button"
							data-note="A"
							data-octave="3"
							class="SynthWhiteKey"
						>
							<div class="SynthWhiteKey">A<span>3</span></div>
						</button>
					</div>
					<div data-key="black" class="SynthKey">
						<button
							type="button"
							data-note="A#"
							data-octave="3"
							class="SynthBlackKey"
						>
							<div class="SynthBlackKey_label">A#</div>
						</button>
					</div>
					<div data-key="white" class="SynthKey">
						<button
							type="button"
							data-note="B"
							data-octave="3"
							class="SynthWhiteKey"
						>
							<div class="SynthWhiteKey">B<span>3</span></div>
						</button>
					</div>
				</div>
			</div>
		</div>
`;

export { SynthUI };
