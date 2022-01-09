<script>
	import{msgCheck}from '../../store' 
	$: msgCheck && setTimeout(() => ($msgCheck = ''), 4000)
</script>

<div class="popup">
	<h3>Warning!</h3>
	{$msgCheck}
</div>

<style>
	.popup {
		text-align: center;
		background-color: rgb(230, 79, 79);
		border-radius: 15px;
		position: fixed;
		right: 50px;
		bottom: 50px;
		padding: 10px 15px;
		z-index: 2;
	}
</style>
