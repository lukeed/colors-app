import { h } from 'preact';

export default props => (
	<label class="md-radio">
		<input type="radio" name="group"
			value={ props.value } checked={ props.checked }
			onChange={ props.onChange }
		/>
		<span class="md-radio--fake"><span /></span>
		<div>{ props.label }</div>
	</label>
)
